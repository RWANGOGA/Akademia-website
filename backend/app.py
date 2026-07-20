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

load_dotenv()

app = FastAPI(title="Akademia Local SQLite CMS & Neural Core", version="6.0")

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
        "description": "Our main company portal bridging Japan and Uganda."
    }
}

def scrape_website_deep(url: str) -> str:
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=3)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            for element in soup(["script", "style", "nav", "footer", "noscript", "iframe"]):
                element.extract()
            text_blocks = [tag.get_text(strip=True) for tag in soup.find_all(['h1', 'h2', 'h3', 'p', 'li', 'article']) if tag.get_text(strip=True)]
            return " ".join(" ".join(text_blocks).split())[:4000]
    except Exception:
        pass
    return "Platform is live and operational."

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
    live_page_content = scrape_website_deep(selected_project["url"])
    completion = groq_client.chat.completions.create(
        messages=[
            {"role": "system", "content": f"You are Akademia's official AI receptionist. Data: {live_page_content}"},
            {"role": "user", "content": req.message}
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.4,
        max_tokens=800,
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
