from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database import get_db, User

SECRET_KEY = "clarify-ai-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer(auto_error=False)

PLAN_LIMITS = {
    "free": 5,
    "pro": float("inf")
}

def hash_password(password: str) -> str:
    return pwd_context.hash(password[:72])

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(user_id: int) -> str:
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    return jwt.encode({"sub": str(user_id), "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
) -> User:
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except (JWTError, TypeError):
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def check_and_increment_usage(user: User, db: Session) -> dict:
    """Check if user can process an image, reset monthly counter if needed."""
    from datetime import datetime
    now = datetime.utcnow()

    # Reset counter if new billing month
    if user.billing_period_start:
        months_passed = (now.year - user.billing_period_start.year) * 12 + \
                        (now.month - user.billing_period_start.month)
        if months_passed >= 1:
            user.images_used_this_month = 0
            user.billing_period_start = now
            db.commit()

    limit = PLAN_LIMITS.get(user.plan, 5)
    if user.images_used_this_month >= limit:
        return {"allowed": False, "used": user.images_used_this_month, "limit": limit}

    user.images_used_this_month += 1
    db.commit()
    return {"allowed": True, "used": user.images_used_this_month, "limit": limit}
