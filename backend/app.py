import os
import re
import random
import uuid
import shutil
import jwt
from datetime import datetime, timedelta
import psycopg2
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
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
    allow_origins=["http://localhost:3000", "http://localhost", "https://ai-pod.net"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# =============================================================
# JWT AUTHENTICATION CONFIG
# =============================================================
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-super-secret-key-change-this-in-production")
ALGORITHM = "HS256"

@app.post("/api/auth/login")
async def admin_login(username: str = Form(...), password: str = Form(...)):
    admin_user = os.getenv("ADMIN_USER", "admin")
    admin_pass = os.getenv("ADMIN_PASS", "Akademia2024!")
    
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
    return psycopg2.connect(
        dbname="akademia_cms",
        user="akademia_admin",
        password="akademia_123",
        host="db"  # "db" is the correct service name when running inside Docker
    )

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

class ChatRequest(BaseModel):
    message: str
    project_key: str = "akademia"

class TTSRequest(BaseModel):
    text: str

class ContentUpdate(BaseModel):
    content_key: str
    content_value: str
    admin_secret: str

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
async def update_universal_content(req: ContentUpdate):
    try:
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# =============================================================
# ACTIVITIES ENDPOINTS (File Uploads + Database)
# =============================================================
@app.post("/api/activities")
async def create_activity(
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(None),
    video: UploadFile = File(None)
):
    image_url = None
    video_url = None

    if image and image.filename:
        ext = image.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_url = f"/uploads/{unique_filename}"

    if video and video.filename:
        ext = video.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
        video_url = f"/uploads/{unique_filename}"

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO activities (title, description, image_url, video_url)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
        """, (title, description, image_url, video_url))
        activity_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Activity created successfully!", "id": activity_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/activities")
async def get_activities():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, image_url, video_url, created_at 
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
                "image_url": row[3],
                "video_url": row[4],
                "created_at": row[5].isoformat() if row[5] else None
            }
            for row in rows
        ]
        return {"activities": activities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/activities/{activity_id}")
async def get_activity(activity_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, description, image_url, video_url, created_at
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
            "image_url": row[3],
            "video_url": row[4],
            "created_at": row[5].isoformat() if row[5] else None,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# =============================================================
# EXISTING AI CHAT & TTS ENDPOINTS
# =============================================================
@app.post("/chat")
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

@app.post("/tts")
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