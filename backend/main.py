from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from rembg import remove, new_session
import io

from database import get_db, User
from auth import (
    hash_password, verify_password, create_access_token,
    get_current_user, check_and_increment_usage
)

app = FastAPI(title="Clarify AI")

# FAST MODEL
rembg_session = new_session("u2netp")

# CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://127.0.0.1:3000",
#         "http://localhost:3000",
#         "https://scale-ai-5k3b.vercel.app"
#     ],
#     allow_origin_regex=r"https://.*\.vercel\.app",
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ─── SCHEMAS ────────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str = ""

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ─── AUTH ROUTES ────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"status": "Clarify AI running"}

@app.post("/auth/register")
async def register(body: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=body.email,
        name=body.name or body.email.split("@")[0],
        password_hash=hash_password(body.password),
        plan="free",
        images_used_this_month=0,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return {
        "token": token,
        "user": _user_dict(user)
    }

@app.post("/auth/login")
async def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not user.password_hash:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user.id)
    return {
        "token": token,
        "user": _user_dict(user)
    }

@app.get("/auth/me")
async def me(user: User = Depends(get_current_user)):
    return _user_dict(user)

# ─── GOOGLE OAUTH (stub — wire up with your Google client ID) ───────────────

class GoogleAuthRequest(BaseModel):
    credential: str  # Google ID token from frontend

@app.post("/auth/google")
async def google_auth(body: GoogleAuthRequest, db: Session = Depends(get_db)):
    """
    Verify Google ID token and sign in / register user.
    Install: pip install google-auth
    Set GOOGLE_CLIENT_ID in environment.
    """
    try:
        from google.oauth2 import id_token
        from google.auth.transport import requests as google_requests
        import os

        GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
        if not GOOGLE_CLIENT_ID:
            raise HTTPException(status_code=500, detail="Google OAuth client ID is not configured on the server.")

        idinfo = id_token.verify_oauth2_token(
            body.credential, google_requests.Request(), GOOGLE_CLIENT_ID
        )

        google_id = idinfo["sub"]
        email = idinfo["email"]
        name = idinfo.get("name", "")
        avatar = idinfo.get("picture", "")

        user = db.query(User).filter(User.google_id == google_id).first()
        if not user:
            user = db.query(User).filter(User.email == email).first()
            if user:
                user.google_id = google_id
                user.avatar = avatar
            else:
                user = User(
                    email=email, name=name, avatar=avatar,
                    google_id=google_id, plan="free", images_used_this_month=0
                )
                db.add(user)
        db.commit()
        db.refresh(user)

        token = create_access_token(user.id)
        return {"token": token, "user": _user_dict(user)}

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Google auth failed: {str(e)}")

# ─── CORE ROUTE ─────────────────────────────────────────────────────────────

@app.post("/remove-bg")
async def remove_bg(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    usage = check_and_increment_usage(user, db)
    if not usage["allowed"]:
        raise HTTPException(
            status_code=429,
            detail={
                "message": "Monthly limit reached",
                "used": usage["used"],
                "limit": usage["limit"],
                "plan": user.plan
            }
        )

    print(f"Processing for {user.email} | plan={user.plan} | used={usage['used']}/{usage['limit']}")

    input_bytes = await file.read()

    try:
        output_bytes = remove(input_bytes, session=rembg_session)
    except Exception as e:
        print("rembg error:", e)
        raise HTTPException(status_code=500, detail="Image processing failed")

    return StreamingResponse(
        io.BytesIO(output_bytes),
        media_type="image/png",
        headers={
            "X-Images-Used": str(usage["used"]),
            "X-Images-Limit": str(usage["limit"]),
            "X-Plan": user.plan,
        }
    )
class GoogleTokenRequest(BaseModel):
    access_token: str

@app.post("/auth/google-token")
async def google_token_auth(body: GoogleTokenRequest, db: Session = Depends(get_db)):
    import httpx
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {body.access_token}"}
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    info = r.json()
    google_id = info["sub"]
    email = info["email"]
    name = info.get("name", "")
    avatar = info.get("picture", "")

    user = db.query(User).filter(User.google_id == google_id).first()
    if not user:
        user = db.query(User).filter(User.email == email).first()
        if user:
            user.google_id = google_id
            user.avatar = avatar
        else:
            user = User(email=email, name=name, avatar=avatar,
                       google_id=google_id, plan="free", images_used_this_month=0)
            db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return {"token": token, "user": _user_dict(user)}
# ─── UPGRADE ROUTE (Stripe webhook goes here later) ──────────────────────────

@app.post("/upgrade")
async def upgrade_plan(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Placeholder — connect Stripe checkout here."""
    return {"message": "Stripe integration coming soon", "current_plan": user.plan}

# ─── HELPER ─────────────────────────────────────────────────────────────────

def _user_dict(user: User) -> dict:
    from auth import PLAN_LIMITS
    limit = PLAN_LIMITS.get(user.plan, 5)
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "avatar": user.avatar,
        "plan": user.plan,
        "images_used": user.images_used_this_month,
        "images_limit": limit if limit != float("inf") else -1,
    }
