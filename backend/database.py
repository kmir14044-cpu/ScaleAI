from sqlalchemy import create_engine, Column, Integer, String, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import enum

DATABASE_URL = "sqlite:///./clarify.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class PlanType(str, enum.Enum):
    free = "free"
    pro = "pro"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    password_hash = Column(String, nullable=True)  # nullable for Google OAuth users
    google_id = Column(String, unique=True, nullable=True)
    plan = Column(String, default="free")
    images_used_this_month = Column(Integer, default=0)
    billing_period_start = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
