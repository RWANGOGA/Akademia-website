
import os
import sqlite3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

load_dotenv()

app = FastAPI(title="Akademia Multi-Page Deep Crawler & Neural Core", version="7.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_db_connection():
    conn = sqlite3.connect("akademia_cms.db")
    conn.row_factory = sqlite3.Row
    return conn

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
                
                # Extract links to other sub-pages on the same domain
                for link in soup.find_all('a', href=True):
                    abs_url = urljoin(current_url, link['href'])
                    parsed_link = urlparse(abs_url)
                    if parsed_link.netloc == domain and abs_url not in visited and abs_url not in to_visit:
                        # Skip anchor links or file downloads
                        if not any(abs_url.endswith(ext) for ext in ['.pdf', '.jpg', '.png', '.zip', '.css', '.js']):
                            to_visit.append(abs_url)

                # Clean up noise
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

class ChatRequest(BaseModel):
    message: str
    project_key: str = "akademia"

class TTSRequest(BaseModel):
    text: str

class ContentUpdate(BaseModel):
    content_key: str
    content_value: str
    admin_secret: str

@app.get("/content/{content_key:path}")
async def get_universal_content(content_key: str):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT content_value FROM site_content WHERE content_key = ?", (content_key,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        if result:
            return {"content": result["content_value"]}
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
            VALUES (?, ?, CURRENT_TIMESTAMP)
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

@app.post("/chat")
async def chat(req: ChatRequest):
    selected_project = PROJECT_REGISTRY.get(req.project_key.lower(), PROJECT_REGISTRY["akademia"])
    
    # Deep multi-page crawl across sub-links of the target portal
    live_multi_page_content = crawl_entire_website(selected_project["url"], max_pages=6)
    directory_summary = "\n".join([f"- {p['name']} ({p['url']}): {p['description']}" for p in PROJECT_REGISTRY.values()])

    completion = groq_client.chat.completions.create(
        messages=[
            {
                "role": "system", 
                "content": (
                    f"You are Akademia's official front-desk receptionist and AI representative. "
                    f"Always speak using first-person plural pronouns ('we', 'us', 'our') when talking about Akademia "
                    f"and our sub-teams. Keep answers concise, accurate, and informative.\n\n"
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
    return {"response": completion.choices[0].message.content}

@app.post("/tts")
async def text_to_speech(req: TTSRequest):
    try:
        url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en"
        headers = {
            "Authorization": f"Token {os.getenv('DEEPGRAM_API_KEY')}",
            "Content-Type": "application/json"
        }
        response = requests.post(url, json={"text": req.text}, headers=headers, timeout=10)
        if response.status_code == 200:
            return Response(content=response.content, media_type="audio/mp3")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
