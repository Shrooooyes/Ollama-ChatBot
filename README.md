# OLLAMA CHAT BOT

# *Backend*
This is the backend for the Chat-AI App, built using **FastAPI**, **MongoDB**, and **Uvicorn**. It handles user authentication, session management, chat history storage, and querying an LLM (LLaMA3) running locally.

---

## 📦 Tech Stack

- **FastAPI** - Web framework for building APIs
- **Uvicorn** - ASGI server for running FastAPI
- **Motor** - Async MongoDB driver
- **Passlib** - Password hashing with bcrypt
- **Python-dotenv** - Environment variable management
- **MongoDB** - NoSQL database for storing users and chats
- **LLaMA 3 (via Ollama)** - Local large language model for generating chat responses

---

## 📂 Project Structure
```folder-structure
backend/
├── .env # Environment variables
├── app.py # Main FastAPI application
├── auth.py # Password hashing and verification
├── database.py # MongoDB async client setup
├── model.py # Pydantic models for request validation
├── venv/ # Virtual environment (not tracked)
└── pycache/ # Python bytecode cache
```
---
## Prerequisites
- **Python 3.9+**
- **MongoDB** (local or remote)
- **ollama** (for locally running LLaMA3 model)
- **virtualenv** (optional but recommended)

---

## 🔧 Setup Instructions
```bash
cd backend
```
1. Install Requirements from requirements.txt
```bash
pip install -r requirements.txt

```
2. Activate Virtual Environment
```bash
venv/bin/activate  # On Windows: venv\Scripts\activate
```
3. Add MongoDb URI and Hashing Key in .env (According to you setup)
```.env
MONGODB_URI=mongodb://localhost:27017
SESSION_SECRET_KEY=your-secret-key
```

Make sure MongoDB is running locally or update the URI accordingly.
---
## 🚀 Running the Backend Server
```bash
uvicorn app:app --reload
```
Visit: http://localhost:8000

---
## 📮 API Endpoints

| Method | Route        | Description                                 |
|--------|--------------|---------------------------------------------|
| GET    | `/`          | Welcome message                             |
| POST   | `/signup`    | Register new user                           |
| POST   | `/login`     | Login existing user                         |
| POST   | `/logout`    | Logout and clear session                    |
| GET    | `/protected` | Access protected route if logged in         |
| POST   | `/query`     | Get LLaMA3 response based on chat history   |

## 🧠 LLaMA3 Integration
This app connects to a locally running LLaMA3 instance via command-line using:
```bash
echo "<formatted input>" | ollama run llama3.2
```
---

# *Frontend*
- A signup page
- A multi-chat interface
- Speech-to-text and text-to-speech features
- Chat history management

---

## 🛠 Technologies Used

- **React.js** (with functional components and hooks)
- **React Speech Recognition** (`react-speech-recognition`)
- **React Text to Speech** (`react-text-to-speech`)
- **Vanilla CSS** for styling

---

## 📁 Folder Structure
```folder-structure
frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── ChatInterface.jsx
│   │   ├── Signup.jsx
│   │   └── chat_app.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
└── package-lock.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Backend server running at `http://localhost:8000`

### Installation

```bash
cd frontend
npm install
```

### Run the App
```bash
npm run dev
```

---

## 🧠 Features
- 🎙 Voice input using microphone
- 🔊 Reads out responses using TTS
- 🧵 Maintains multiple chat threads
- ✍️ Custom user messages sent to a backend API
- 🔐 Simple login simulation using props

## 🔗 API Endpoint

The frontend sends POST requests to:

```bash
  POST http://localhost:8000/query
```

With body:
```JSON
{
  "chat_id": 0,
  "prompt": "your message",
  "user": "user@example.com"
}
```

The response is expected to include updated chat history like:
```JSON
{
  "message": {
    "chats": [...updated chats...]
  }
}
```

## ⚠️ Notes
- Ensure microphone permissions are enabled in the browser.
- Works best in Chrome and Chromium-based browsers.
- Make sure the backend server is running before starting the frontend.

## 📌 To Do
- Add real authentication
- Improve message formatting
- Add persistent storage for chats
- Mobile responsiveness
- Add WebSocket support for live chat
- JWT-based authentication (instead of session)
- Dockerize backend for deployment

## 📄 License
MIT License. Feel free to modify and use.

## 🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.
