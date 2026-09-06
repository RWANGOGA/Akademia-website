import os
import re
import random
import uuid
import shutil
import time
import html as html_lib
import jwt
import resend
from datetime import datetime, timedelta
from collections import defaultdict
import psycopg2
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
from groq import Groq
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, quote

# 1. Load environment variables FIRST
load_dotenv()

# 2. Initialize FastAPI app
app = FastAPI(title="Akademia Multi-Page Deep Crawler & Neural Core", version="7.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://ai-pod.net"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# =============================================================
# SECURITY CONFIG
# =============================================================
REQUIRED_ENV_VARS = [
    "JWT_SECRET_KEY",
    "ADMIN_USER",
    "ADMIN_PASS",
    "DATABASE_URL",
    "GROQ_API_KEY",
    "DEEPGRAM_API_KEY",
    "RESEND_API_KEY",
]
missing_env = [var for var in REQUIRED_ENV_VARS if not os.getenv(var)]
if missing_env:
    raise RuntimeError(f"Missing required environment variables: {', '.join(missing_env)}")

SECRET_KEY = os.environ["JWT_SECRET_KEY"]
ALGORITHM = "HS256"
ADMIN_USER = os.environ["ADMIN_USER"]
ADMIN_PASS = os.environ["ADMIN_PASS"]
DATABASE_URL = os.environ["DATABASE_URL"]

_rate_limit_store = defaultdict(list)
RATE_LIMIT_WINDOW = 60
RATE_LIMIT_MAX = 20

def _is_rate_limited(key: str) -> bool:
    now = time.time()
    timestamps = _rate_limit_store[key]
    _rate_limit_store[key] = [ts for ts in timestamps if now - ts < RATE_LIMIT_WINDOW]
    if len(_rate_limit_store[key]) >= RATE_LIMIT_MAX:
        return True
    _rate_limit_store[key].append(now)
    return False

def rate_limiter_dep(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    if _is_rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")

def get_current_admin(request: Request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    token = auth_header.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("sub") != ADMIN_USER:
            raise HTTPException(status_code=403, detail="Forbidden")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload

@app.get("/api/auth/verify")
async def verify_token(request: Request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = auth_header.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"valid": True, "user": payload.get("sub")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/api/auth/login")
async def admin_login(username: str = Form(...), password: str = Form(...)):
    if not os.getenv("ADMIN_USER") or not os.getenv("ADMIN_PASS"):
        raise HTTPException(status_code=500, detail="Server not configured")
    admin_user = os.environ["ADMIN_USER"]
    admin_pass = os.environ["ADMIN_PASS"]
    
    if username == admin_user and password == admin_pass:
        token = jwt.encode(
            {
                "sub": username,
                "exp": datetime.utcnow() + timedelta(hours=24)
            },
            SECRET_KEY,
            algorithm=ALGORITHM
        )
        return {"access_token": token, "token_type": "bearer"}
    
    raise HTTPException(status_code=401, detail="Invalid username or password")

# =============================================================
# DATABASE CONNECTION
# =============================================================
def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

# =============================================================
# STATIC FILES (To serve uploaded images/videos)
# =============================================================
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

PROJECT_REGISTRY = {
    "akademia": {
        "name": "Akademia Mother Project",
        "url": "https://www.akademia.co.jp/",
        "description": "Our main company portal bridging Japan and Uganda, offering general software development, mobile apps, and tech solutions."
    },
    "ai-dojo": {
        "name": "AI DOJO Team",
        "url": "https://ai-dojo-opal.vercel.app/",
        "description": "Our dedicated AI Dojo platform for learning Japanese and English languages, featuring interactive intelligent practice."
    },
    "makerere": {
        "name": "Makerere Translation Team (API)",
        "url": "https://uj-tc-api.akademia.co.jp/",
        "description": "Our high-performance translation checking and API backend server managed alongside Makerere partnerships."
    },
    "ai-pod": {
        "name": "AI-POD Team",
        "url": "https://ai-daily-report.akademia.co.jp/",
        "description": "Our automated AI Daily Report and operation tracking system."
    },
    "ai-avatar": {
        "name": "AI Avatar Team",
        "url": "https://ai-avatar.akademia.co.jp/",
        "description": "Our cutting-edge interactive AI Avatar deployment platform. Note: AI Avatars are fully deployed and integrated across all our systems!"
    },
    "world": {
        "name": "World Team (Virtual Workspace)",
        "url": "https://vf.akademia.co.jp/",
        "description": "Our immersive virtual office and collaboration space (featuring our main map connecting Uganda and Shizuoka, Japan)."
    },
    "ai-recruiter": {
        "name": "UICT AI Recruiter",
        "url": "https://ai-recruiter.akademia.co.jp/",
        "description": "Our intelligent AI Recruiter platform built in collaboration with UICT to streamline talent acquisition."
    }
}

# =============================================================
# HUMAN ESCALATION CONFIG
# =============================================================
DIRECTOR_NAME = "our Director"
DIRECTOR_EMAIL = "gen@akademia.co.jp"
DIRECTOR_PHONE_DISPLAY = "090-5756-3969"
DIRECTOR_PHONE_TEL = "+819057563969"
DIRECTOR_WHATSAPP_NUMBER = "819057563969"

def build_whatsapp_url(prefill_text: str = "") -> str:
    base = f"https://wa.me/{DIRECTOR_WHATSAPP_NUMBER}"
    if prefill_text:
        return f"{base}?text={quote(prefill_text)}"
    return base

def build_contact_actions(prefill_text: str = "") -> List[dict]:
    return [
        {"type": "whatsapp", "label": "Message us on WhatsApp", "url": build_whatsapp_url(prefill_text)},
        {"type": "call", "label": f"Call {DIRECTOR_PHONE_DISPLAY}", "url": f"tel:{DIRECTOR_PHONE_TEL}"},
        {"type": "email", "label": "Email us", "url": f"mailto:{DIRECTOR_EMAIL}"},
    ]

WARM_OPENERS = [
    "That's a great question.", "Happy to help point you in the right direction here.",
    "Good question — let's get you sorted properly.", "Thanks for asking about this.",
    "That's definitely something we can help with.",
]

def pick_opener() -> str:
    return random.choice(WARM_OPENERS)

ESCALATION_CATEGORIES = {
    "human_request": {
        "keywords": ["talk to a human", "speak to a human", "real person", "human agent", "talk to the director", "speak to the director", "contact the director", "talk to someone", "speak to someone"],
        "message": f"Of course — give me just a moment to connect you with {DIRECTOR_NAME}. You'll find the quickest ways to reach us just below.",
        "prefill": "Hi, I'd like to speak with someone from your team.",
    },
    "pricing": {
        "keywords": ["pricing", "price quote", "quote for", "how much would it cost", "how much does it cost", "budget for", "cost estimate", "discount"],
        "message": f"Since pricing depends on the scope of your project, let's get you a proper quote directly from {DIRECTOR_NAME} rather than a guess from me. Reach out using the options below and we'll get back to you quickly.",
        "prefill": "Hi, I would like a pricing quote.",
    },
    "contract": {
        "keywords": ["invoice", "payment terms", "refund", "cancel my order", "sign an nda", "sign a contract", "terms and conditions"],
        "message": f"For contracts, invoices, and payment terms, {DIRECTOR_NAME} will want to go through the details with you personally, to make sure everything is accurate. Here are the quickest ways to connect.",
        "prefill": "Hi, I need help with a contract or payment matter.",
    },
    "legal": {
        "keywords": ["legal", "lawsuit", "compliance issue", "data breach", "security incident", "gdpr", "complaint", "dispute"],
        "message": f"This is something {DIRECTOR_NAME} will want to hear about directly and as soon as possible. Please use the options below to reach us right away.",
        "prefill": "Hi, I need to raise an urgent matter.",
    },
    "partnership": {
        "keywords": ["negotiate", "negotiation", "investment proposal", "investment opportunity", "partnership agreement", "acquisition", "merger", "funding", "invest in", "investor", "collaborate", "collaboration", "business proposal"],
        "message": f"We'd genuinely love to explore this with you. {DIRECTOR_NAME} handles all of our partnership and investment conversations personally, so let's get you connected using the options below.",
        "prefill": "Hi, I would like to discuss a partnership or business opportunity.",
    },
    "hr": {
        "keywords": ["salary", "compensation", "harassment", "workplace complaint"],
        "message": f"This is something {DIRECTOR_NAME} should hear directly and personally. Please reach out using the options below whenever you're ready — we take matters like this seriously.",
        "prefill": "",
    },
}

ESCALATION_MARKER_PREFIX = "ESCALATE_TO_HUMAN"

def default_escalation_message() -> str:
    return f"Let's get you connected directly to {DIRECTOR_NAME} for this one. You'll find the quickest ways to reach us just below."

def detect_escalation_category_by_keyword(message: str) -> Optional[str]:
    lowered = message.lower()
    for category, data in ESCALATION_CATEGORIES.items():
        if any(keyword in lowered for keyword in data["keywords"]):
            return category
    return None

def build_human_handoff_payload(category: Optional[str]) -> dict:
    opener = pick_opener()
    if category and category in ESCALATION_CATEGORIES:
        data = ESCALATION_CATEGORIES[category]
        body = data["message"]
        prefill = data["prefill"]
    else:
        body = default_escalation_message()
        prefill = ""
    return {"response": f"{opener} {body}", "actions": build_contact_actions(prefill)}

def extract_escalation_category_from_llm_output(raw_response: str) -> Optional[str]:
    match = re.search(r'ESCALATE_TO_HUMAN(?::(\w+))?', raw_response)
    if not match:
        return None
    category = match.group(1)
    if category and category in ESCALATION_CATEGORIES:
        return category
    return ""

def crawl_entire_website(base_url: str, max_pages: int = 5) -> str:
    visited = set()
    to_visit = [base_url]
    parsed_base = urlparse(base_url)
    domain = parsed_base.netloc
    collected_text = []
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

    while to_visit and len(visited) < max_pages:
        current_url = to_visit.pop(0)
        if current_url in visited:
            continue
        visited.add(current_url)
        try:
            parsed = urlparse(current_url)
            if parsed.scheme not in ("http", "https"):
                continue
            if parsed.hostname not in (domain, f"www.{domain}"):
                continue
            response = requests.get(current_url, headers=headers, timeout=3)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                for link in soup.find_all('a', href=True):
                    abs_url = urljoin(current_url, link['href'])
                    parsed_link = urlparse(abs_url)
                    if parsed_link.netloc == domain and abs_url not in visited and abs_url not in to_visit:
                        if not any(abs_url.endswith(ext) for ext in ['.pdf', '.jpg', '.png', '.zip', '.css', '.js']):
                            to_visit.append(abs_url)
                for element in soup(["script", "style", "nav", "footer", "noscript", "iframe"]):
                    element.extract()
                text_blocks = [tag.get_text(strip=True) for tag in soup.find_all(['h1', 'h2', 'h3', 'p', 'li', 'article', 'section']) if tag.get_text(strip=True)]
                page_text = " ".join(" ".join(text_blocks).split())
                if page_text:
                    collected_text.append(f"--- PAGE: {current_url} ---\n{page_text}")
        except Exception:
            continue
    full_corpus = "\n\n".join(collected_text)
    return full_corpus[:8000] if full_corpus else "Platform is live and operational."

def clean_text_for_speech(text: str) -> str:
    if not text:
        return ""
    cleaned = text
    cleaned = re.sub(r'\*\*(.*?)\*\*', r'\1', cleaned)
    cleaned = re.sub(r'__(.*?)__', r'\1', cleaned)
    cleaned = re.sub(r'\*(.*?)\*', r'\1', cleaned)
    cleaned = re.sub(r'(?<!\w)_(.*?)_(?!\w)', r'\1', cleaned)
    cleaned = re.sub(r'^\s{0,3}#{1,6}\s*', '', cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r'```.*?```', '', cleaned, flags=re.DOTALL)
    cleaned = re.sub(r'`([^`]*)`', r'\1', cleaned)
    cleaned = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', cleaned)
    cleaned = re.sub(r'https?://\S+', '', cleaned)
    cleaned = re.sub(r'\bwww\.\S+', '', cleaned)
    cleaned = re.sub(r'^\s*\d+[\.\)]\s*', '', cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r'^\s*[-\*•]\s*', '', cleaned, flags=re.MULTILINE)
    cleaned = cleaned.replace('#', '').replace('*', '').replace('_', '')
    cleaned = re.sub(r'\n+', '. ', cleaned)
    cleaned = re.sub(r'\s{2,}', ' ', cleaned)
    cleaned = re.sub(r'\.{2,}', '.', cleaned)
    cleaned = re.sub(r'\s+([.,!?])', r'\1', cleaned)
    return cleaned.strip()

# =============================================================
# PYDANTIC MODELS
# =============================================================
class ChatRequest(BaseModel):
    message: str
    project_key: str = "akademia"

class TTSRequest(BaseModel):
    text: str

class CommentRequest(BaseModel):  # <-- FIXED: lowercase 'class'
    user_name: str
    rating: int
    comment: str    

class ContentUpdate(BaseModel):
    content_key: str
    content_value: str
    admin_secret: str

class ContactRequest(BaseModel):
    inquiryType: str
    firstName: str
    lastName: str
    email: str
    phone: Optional[str] = None
    companyName: Optional[str] = None
    website: Optional[str] = None
    message: str
    optIn: bool = False

# =============================================================
# EXISTING CONTENT ENDPOINTS
# =============================================================
@app.get("/content/{content_key:path}")
async def get_universal_content(content_key: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT content_value FROM site_content WHERE content_key = %s", (content_key,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        if result:
            return {"content": result[0]}
        return {"content": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/content/update")
async def update_universal_content(req: ContentUpdate, _: dict = Depends(get_current_admin)):
    try:
        if req.admin_secret != ADMIN_PASS:
            raise HTTPException(status_code=403, detail="Invalid admin secret")
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO site_content (content_key, content_value, updated_at)
            VALUES (%s, %s, CURRENT_TIMESTAMP)
            ON CONFLICT(content_key) 
            DO UPDATE SET content_value = excluded.content_value, updated_at = CURRENT_TIMESTAMP
            """,
            (req.content_key, req.content_value)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return {"status": "success", "message": "Content updated locally!"}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")

# =============================================================
# ACTIVITIES ENDPOINTS (Multiple File Uploads + Database Arrays)
# =============================================================
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
ALLOWED_VIDEO_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv", ".webm"}
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/quicktime", "video/x-msvideo", "video/x-matroska", "video/webm"}

def validate_upload(file: UploadFile, allowed_extensions: set, allowed_types: set) -> str:
    if not file.filename:
        raise HTTPException(status_code=400, detail="Empty filename")
    ext = "." + file.filename.rsplit(".", 1)[-1].lower()
    if ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"Unsupported file extension: {ext}")
    content_type = file.content_type or ""
    if content_type not in allowed_types:
        raise HTTPException(status_code=400, detail=f"Unsupported content type: {content_type}")
    return ext

@app.post("/api/activities", dependencies=[Depends(rate_limiter_dep)])
async def create_activity(
    title: str = Form(...),
    description: str = Form(...),
    images: List[UploadFile] = File(default=[]),
    videos: List[UploadFile] = File(default=[]),
    _: dict = Depends(get_current_admin)
):
    image_urls = []
    video_urls = []

    for image in images:
        if image.filename:
            ext = validate_upload(image, ALLOWED_IMAGE_EXTENSIONS, ALLOWED_IMAGE_TYPES)
            unique_filename = f"{uuid.uuid4()}{ext}"
            file_path = os.path.join(UPLOAD_DIR, unique_filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            image_urls.append(f"/uploads/{unique_filename}")

    for video in videos:
        if video.filename:
            ext = validate_upload(video, ALLOWED_VIDEO_EXTENSIONS, ALLOWED_VIDEO_TYPES)
            unique_filename = f"{uuid.uuid4()}{ext}"
            file_path = os.path.join(UPLOAD_DIR, unique_filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(video.file, buffer)
            video_urls.append(f"/uploads/{unique_filename}")

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO activities (title, description, image_urls, video_urls)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
        """, (title, description, image_urls, video_urls))
        activity_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Activity created successfully!", "id": activity_id}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/api/activities")
async def get_activities():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, image_urls, video_urls, created_at 
            FROM activities 
            ORDER BY created_at DESC;
        """)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        
        activities = [
            {
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "image_urls": row[3] or [],
                "video_urls": row[4] or [],
                "created_at": row[5].isoformat() if row[5] else None
            }
            for row in rows
        ]
        return {"activities": activities}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/api/activities/{activity_id}")
async def get_activity(activity_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, image_urls, video_urls, created_at
            FROM activities
            WHERE id = %s;
        """, (activity_id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()

        if not row:
            raise HTTPException(status_code=404, detail="Activity not found")

        return {
            "id": row[0],
            "title": row[1],
            "description": row[2],
            "image_urls": row[3] or [],
            "video_urls": row[4] or [],
            "created_at": row[5].isoformat() if row[5] else None,
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


@app.put("/api/activities/{activity_id}", dependencies=[Depends(rate_limiter_dep)])
async def update_activity(
    activity_id: int,
    title: str = Form(...),
    description: str = Form(...),
    images: List[UploadFile] = File(default=[]),
    videos: List[UploadFile] = File(default=[]),
    _: dict = Depends(get_current_admin)
):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT image_urls, video_urls FROM activities WHERE id = %s", (activity_id,))
        existing = cursor.fetchone()
        
        if not existing:
            cursor.close()
            conn.close()
            raise HTTPException(status_code=404, detail="Activity not found")
        
        old_image_urls, old_video_urls = existing or ([], [])
        
        new_image_urls = list(old_image_urls) if old_image_urls else []
        new_video_urls = list(old_video_urls) if old_video_urls else []

        if images and any(img.filename for img in images):
            for old_url in (old_image_urls or []):
                old_file = os.path.join(UPLOAD_DIR, old_url.replace("/uploads/", ""))
                if os.path.exists(old_file): os.remove(old_file)
            new_image_urls = []
            for image in images:
                if image.filename:
                    ext = validate_upload(image, ALLOWED_IMAGE_EXTENSIONS, ALLOWED_IMAGE_TYPES)
                    unique_filename = f"{uuid.uuid4()}{ext}"
                    file_path = os.path.join(UPLOAD_DIR, unique_filename)
                    with open(file_path, "wb") as buffer:
                        shutil.copyfileobj(image.file, buffer)
                    new_image_urls.append(f"/uploads/{unique_filename}")

        if videos and any(vid.filename for vid in videos):
            for old_url in (old_video_urls or []):
                old_file = os.path.join(UPLOAD_DIR, old_url.replace("/uploads/", ""))
                if os.path.exists(old_file): os.remove(old_file)
            new_video_urls = []
            for video in videos:
                if video.filename:
                    ext = validate_upload(video, ALLOWED_VIDEO_EXTENSIONS, ALLOWED_VIDEO_TYPES)
                    unique_filename = f"{uuid.uuid4()}{ext}"
                    file_path = os.path.join(UPLOAD_DIR, unique_filename)
                    with open(file_path, "wb") as buffer:
                        shutil.copyfileobj(video.file, buffer)
                    new_video_urls.append(f"/uploads/{unique_filename}")

        cursor.execute("""
            UPDATE activities 
            SET title = %s, description = %s, image_urls = %s, video_urls = %s
            WHERE id = %s
            RETURNING id;
        """, (title, description, new_image_urls, new_video_urls, activity_id))
        
        updated_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"message": "Activity updated successfully!", "id": updated_id}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


@app.delete("/api/activities/{activity_id}", dependencies=[Depends(rate_limiter_dep)])
async def delete_activity(activity_id: int, _: dict = Depends(get_current_admin)):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT image_urls, video_urls FROM activities WHERE id = %s", (activity_id,))
        existing = cursor.fetchone()
        
        if not existing:
            cursor.close()
            conn.close()
            raise HTTPException(status_code=404, detail="Activity not found")
        
        image_urls, video_urls = existing or ([], [])
        
        cursor.execute("DELETE FROM activities WHERE id = %s", (activity_id,))
        conn.commit()
        cursor.close()
        conn.close()
        
        for url in (image_urls or []):
            old_file = os.path.join(UPLOAD_DIR, url.replace("/uploads/", ""))
            if os.path.exists(old_file): os.remove(old_file)
            
        for url in (video_urls or []):
            old_file = os.path.join(UPLOAD_DIR, url.replace("/uploads/", ""))
            if os.path.exists(old_file): os.remove(old_file)
        
        return {"message": "Activity deleted successfully!"}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


# =============================================================
# NEW: ACTIVITY COMMENTS & RATINGS ENDPOINTS
# =============================================================
@app.post("/api/activities/{activity_id}/comments")
async def add_activity_comment(activity_id: int, req: CommentRequest):
    try:
        if req.rating < 1 or req.rating > 5:
            raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
            
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO activity_comments (activity_id, user_name, rating, comment)
            VALUES (%s, %s, %s, %s)
            RETURNING id, created_at;
        """, (activity_id, req.user_name, req.rating, req.comment))
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            "status": "success",
            "message": "Comment added successfully!",
            "comment": {
                "id": result[0],
                "user_name": req.user_name,
                "rating": req.rating,
                "comment": req.comment,
                "created_at": result[1].isoformat()
            }
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/api/activities/{activity_id}/comments")
async def get_activity_comments(activity_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, user_name, rating, comment, created_at 
            FROM activity_comments 
            WHERE activity_id = %s 
            ORDER BY created_at DESC;
        """, (activity_id,))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        
        comments = [
            {
                "id": row[0],
                "user_name": row[1],
                "rating": row[2],
                "comment": row[3],
                "created_at": row[4].isoformat() if row[4] else None
            }
            for row in rows
        ]
        return {"comments": comments}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# =============================================================
# CONTACT FORM EMAIL ENDPOINT
# =============================================================
@app.post("/api/contact", dependencies=[Depends(rate_limiter_dep)])
async def send_contact_email(req: ContactRequest):
    try:
        resend.api_key = os.getenv("RESEND_API_KEY")
        
        safe_inquiry = html_lib.escape(req.inquiryType)
        safe_first = html_lib.escape(req.firstName)
        safe_last = html_lib.escape(req.lastName)
        safe_email = html_lib.escape(req.email)
        safe_phone = html_lib.escape(req.phone) if req.phone else ""
        safe_company = html_lib.escape(req.companyName) if req.companyName else ""
        safe_website = html_lib.escape(req.website) if req.website else ""
        safe_message = html_lib.escape(req.message).replace("\n", "<br>")
        
        subject = f"[Website Inquiry] {req.inquiryType} — {req.firstName} {req.lastName}"
        
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0B1E3D; border-bottom: 2px solid #FBBF24; padding-bottom: 10px;">
                New Website Inquiry
            </h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Inquiry Type:</strong> {safe_inquiry}</p>
                <p style="margin: 8px 0;"><strong>Name:</strong> {safe_first} {safe_last}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:{safe_email}" style="color: #0B1E3D;">{safe_email}</a></p>
                {f'<p style="margin: 8px 0;"><strong>Phone:</strong> {safe_phone}</p>' if safe_phone else ''}
                {f'<p style="margin: 8px 0;"><strong>Company:</strong> {safe_company}</p>' if safe_company else ''}
                {f'<p style="margin: 8px 0;"><strong>Website:</strong> <a href="{safe_website}" style="color: #0B1E3D;">{safe_website}</a></p>' if safe_website else ''}
            </div>
            
            <h3 style="color: #0B1E3D;">Message:</h3>
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #FBBF24; border-radius: 4px;">
                <p style="line-height: 1.6; color: #334155;">{safe_message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
                <p>This inquiry was submitted via the DYNA WISDOM website contact form.</p>
                {f'<p style="margin-top: 8px;"><em>User opted in to receive occasional insights.</em></p>' if req.optIn else ''}
            </div>
        </div>
        """
        
        params = {
            "from": os.getenv("CONTACT_EMAIL_FROM", "onboarding@resend.dev"),
            "to": os.getenv("CONTACT_EMAIL_TO", "gen@akademia.co.jp"),
            "subject": subject,
            "html": html_content,
            "reply_to": req.email
        }
        
        email = resend.Emails.send(params)
        
        return {
            "status": "success", 
            "message": "Your message has been sent successfully! We'll get back to you soon."
        }
        
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500, 
            detail="Failed to send email. Please try again later or contact us directly."
        )


# =============================================================
# EXISTING AI CHAT & TTS ENDPOINTS
# =============================================================
@app.post("/chat", dependencies=[Depends(rate_limiter_dep)])
async def chat(req: ChatRequest):
    selected_project = PROJECT_REGISTRY.get(req.project_key.lower(), PROJECT_REGISTRY["akademia"])
    keyword_category = detect_escalation_category_by_keyword(req.message)
    if keyword_category:
        return build_human_handoff_payload(keyword_category)

    live_multi_page_content = crawl_entire_website(selected_project["url"], max_pages=6)
    directory_summary = "\n".join([f"- {p['name']} ({p['url']}): {p['description']}" for p in PROJECT_REGISTRY.values()])
    category_names = ", ".join(ESCALATION_CATEGORIES.keys())

    completion = groq_client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    f"You are Akademia's official front-desk receptionist and AI representative. "
                    f"Always speak using first-person plural pronouns ('we', 'us', 'our') when talking about Akademia "
                    f"and our sub-teams.\n\n"
                    f"HUMAN ESCALATION RULE (very important): You do NOT have authority to quote prices, "
                    f"negotiate contracts, discuss legal matters, handle complaints, discuss salaries or HR "
                    f"issues, discuss partnerships/investment/business negotiations, or make any binding "
                    f"commitment on behalf of the company. If the user's message falls into one of these "
                    f"situations, respond with EXACTLY this token and nothing else, no punctuation, no extra "
                    f"words: {ESCALATION_MARKER_PREFIX}:<category>\n"
                    f"Where <category> is the single best match from this list: {category_names}. "
                    f"For example: {ESCALATION_MARKER_PREFIX}:partnership\n\n"
                    f"FORMATTING RULES (very important): For all other responses, this may be read aloud by a "
                    f"text-to-speech engine, so write in natural, flowing spoken sentences and short "
                    f"paragraphs only. Do NOT use markdown formatting of any kind — no asterisks, "
                    f"no bold, no headers, no numbered lists, no bullet points, no hyphen-dashes as "
                    f"list markers. NEVER include a raw URL or link in your response — if you need to "
                    f"reference a page, describe it in words instead. If you need to present multiple "
                    f"points, weave them into a single conversational paragraph using connecting words "
                    f"like 'first', 'also', 'in addition', and 'finally' instead of list formatting. "
                    f"Keep answers concise, warm, and informative.\n\n"
                    f"ECOSYSTEM DIRECTORY:\n{directory_summary}\n\n"
                    f"COMPREHENSIVE MULTI-PAGE CRAWLED DATA FOR {selected_project['name']}:\n{live_multi_page_content}"
                )
            },
            {"role": "user", "content": req.message}
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.3,
        max_tokens=1000,
    )

    raw_response = completion.choices[0].message.content
    llm_category = extract_escalation_category_from_llm_output(raw_response)
    if llm_category is not None:
        return build_human_handoff_payload(llm_category or None)

    return {"response": raw_response, "actions": []}

@app.post("/tts", dependencies=[Depends(rate_limiter_dep)])
async def text_to_speech(req: TTSRequest):
    try:
        speakable_text = clean_text_for_speech(req.text)
        url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en"
        headers = {
            "Authorization": f"Token {os.getenv('DEEPGRAM_API_KEY')}",
            "Content-Type": "application/json"
        }
        response = requests.post(url, json={"text": speakable_text}, headers=headers, timeout=10)
        if response.status_code == 200:
            return Response(content=response.content, media_type="audio/mp3")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))