from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.security import OAuth2PasswordRequestForm
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from database import my_collection
from model import createUser, loginReq
from auth import hash_password, verify_password
import subprocess
import os
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()
# Add session middleware
app.add_middleware(SessionMiddleware, secret_key=os.getenv("SESSION_SECRET_KEY"))
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] if using React
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, OPTIONS, etc.
    allow_headers=["*"],
)


import subprocess


import subprocess

def generate_llama3_response(prompt, current_chat):
    # Ensure prompt is a single-line string for shell execution
    prompt = prompt.replace("\n", " ")
    # current_chat = current_chat.replace("\n", " ")  # Flatten chat history

    # Format input properly for echo
    input_text = (
        f"SYSTEM: You are a chatbot. Always refer to the chat history before answering. "
        f"Stay in context and respond concisely. DO NOT include the chat history in your response. "
        f"If no relevant context is found, respond based on your own knowledge. "
        f"CHAT HISTORY (for reference only, DO NOT repeat it in your answer): {current_chat} "
        f"USER QUERY: {prompt}"
    )
    
    # Construct command
    command = f'echo "{input_text}" | ollama run llama3.2'

    # Run the command and capture output
    result = subprocess.run(command, shell=True, capture_output=True, text=True, encoding="utf-8")

    return result.stdout.strip()



@app.get("/")
async def read_root():
    return {"message": "Welcome to the Chat-AI"}


@app.post("/signup")
async def signup(user: createUser):

    existing_user = await my_collection.find_one({"email": user.email})
    if existing_user:
        return JSONResponse(
            content={"message": "","error": "User already exists"},
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    hashed_password = hash_password(user.password)

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "chats": [{"chat_id": 0, "messages": []}],
    }

    await my_collection.insert_one(user_data)

    return JSONResponse(
        content={"message": "User created successfully", "error": ""},
        status_code=status.HTTP_201_CREATED,
    )


@app.post("/login")
async def login(req: Request, user_data: loginReq):
    existing_user = await my_collection.find_one({"email": user_data.email})
    if not existing_user:
        return JSONResponse(
            content={"message": "","error": "User not found"}, status_code=status.HTTP_404_NOT_FOUND
        )

    if not verify_password(user_data.password, existing_user["password"]):
        return JSONResponse(
            content={"message": "","error": "Invalid credentials"},
            status_code=status.HTTP_401_UNAUTHORIZED,
        )

    req.session["user"] = existing_user["email"]

    return JSONResponse(
        content={"message": "Login successful","error": "", "chats": existing_user["chats"], "name": existing_user["name"]},
        status_code=status.HTTP_200_OK,
    )


@app.post("/logout")
async def logout(req: Request):
    req.session.pop("user", None)
    return JSONResponse(
        content={"message": "Logout successful", "error": ""}, status_code=status.HTTP_200_OK
    )


@app.get("/protected")
async def protected_route(request: Request):
    user = request.session.get("user")
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    return {"message": f"Hello, {user}! This is a protected route."}


@app.post("/query")
async def getResponse(request: Request):
    body = await request.json()
    user = body.get("user")
    # print("user:",body)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    body = await request.json()
    prompt = body["prompt"]
    chat_id = body["chat_id"]

    user_data = await my_collection.find_one({"email": user}, {"_id": 0, "password": 0})
    chats = user_data["chats"]
    current_chat = []

    if chat_id >= len(user_data["chats"]):
        # print(len(user_data["chats"]), chat_id)
        # print("here")
        chats.append({"chat_id": len(chats), "messages": []})
        chat_id = len(chats) - 1
        # print(chat_id, len(chats))

    current_chat = user_data["chats"][chat_id]["messages"]
    message = generate_llama3_response(prompt, current_chat)
    print(chat_id, user_data["chats"][chat_id])
    current_chat.append({"prompt": prompt, "response": message})

    chats[chat_id]["messages"] = current_chat

    await my_collection.update_one({"email": user}, {"$set": {"chats": chats}})

    return {"message": user_data}
