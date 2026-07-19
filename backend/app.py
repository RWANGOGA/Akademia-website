import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from deepgram import DeepgramClient
from dotenv import load_dotenv

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

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    # Send user message to Groq (Llama 3 model)
    completion = groq_client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant for Akademia."},
            {"role": "user", "content": req.message}
        ],
        model="llama-3.3-70b-versatile",
    )
    return {"response": completion.choices[0].message.content}