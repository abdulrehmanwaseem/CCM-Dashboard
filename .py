import os
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends, Cookie
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from google.oauth2 import id_token
from google.auth.transport.requests import Request
from jose import jwt, JWTError, ExpiredSignatureError
load_dotenv()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"
ALLOWED_DOMAINS = [d.strip().lower() for d in os.getenv("ALLOWED_DOMAINS", "").split(",") if d.strip()]
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
router = APIRouter(prefix="/auth", tags=["Authentication"])
class TokenPayload(BaseModel):
    credential: str
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
def verify_app_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
@router.post("/google")
async def google_auth(payload: TokenPayload):
    try:
        idinfo = id_token.verify_oauth2_token(payload.credential, Request(), GOOGLE_CLIENT_ID)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")
    email = idinfo.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email not found in token")
    domain = email.split("@")[-1].lower()
    if domain not in ALLOWED_DOMAINS:
        raise HTTPException(status_code=403, detail=f"Unauthorized domain: {domain}")
    app_payload = {"sub": idinfo.get("sub"), "email": email, "name": idinfo.get("name")}
    token = create_access_token(app_payload)
    response = JSONResponse({"message": "Login successful", "email": email})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )
    return response
def get_current_user(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return verify_app_token(access_token)
@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    return {"email": user["email"], "name": user.get("name")}
@router.post("/logout")
async def logout():
    response = JSONResponse({"message": "Logged out successfully"})
    response.delete_cookie("access_token", path="/")
    return response
@router.get("/protected")
async def protected(user=Depends(get_current_user)):
    return {"message": f"Welcome {user['email']}, you have access to protected data!"}
