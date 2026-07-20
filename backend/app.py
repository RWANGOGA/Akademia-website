import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from deepgram import DeepgramClient
from dotenv import load_dotenv
import requests
from bs4 import BeautifulSoup

# 1. Load environment variables
load_dotenv()

app = FastAPI()

# 2. Add CORS Middleware to allow your Next.js app to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Initialize clients
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
dg_client = DeepgramClient(api_key=os.getenv("DEEPGRAM_API_KEY"))

# 4. Helper function to scrape project websites dynamically
def scrape_website(url: str) -> str:
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # Strip out clutter elements like nav bars, scripts, and footers
            for script in soup(["script", "style", "nav", "footer"]):
                script.extract()
            text = soup.get_text(separator=' ')
            return " ".join(text.split())[:12000] # Cap text length to fit token limits
    except Exception as e:
        print(f"Scraping error: {e}")
    return "Could not retrieve website content."

class ChatRequest(BaseModel):
    message: str
    target_url: str = "https://www.akademia.co.jp/" # Default website context

@app.post("/chat")
async def chat(req: ChatRequest):
    # Dynamically fetch live data from the website requested
    website_content = scrape_website(req.target_url)

    # Send user message and scraped context to Groq (Llama 3 model)
    completion = groq_client.chat.completions.create(
        messages=[
            {
                "role": "system", 
                "content": (
                    f"You are Akademia's official front-desk receptionist and AI representative. "
                    f"Always speak using first-person plural pronouns ('we', 'us', 'our') when talking about Akademia "
                    f"as part of the company team, never talking about Akademia as 'they' or 'it'. "
                    f"Answer user queries using the live scraped context from the website ({req.target_url}) "
                    f"and our official service directory below:\n\n"
                    f"--- OFFICIAL SERVICE DIRECTORY ---\n"
                    f"- TransChecker: Our translation checking tool.\n"
                    f"- MissionJapanese: Our Japanese language learning platform.\n"
                    f"-----------------------------------\n\n"
                    f"--- WEBSITE CONTENT START ---\n{website_content}\n--- WEBSITE CONTENT END ---\n\n"
                    "Guidelines:\n"
                    "- Maintain a warm, polite, welcoming, and professional receptionist tone using 'we/us'.\n"
                    "- Do not attempt to redirect users to a dashboard page since it is currently disabled."
                )
            },
            {"role": "user", "content": req.message}
        ],
        model="llama-3.3-70b-versatile",
    )
    return {"response": completion.choices[0].message.content}