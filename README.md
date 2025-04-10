# OLLAMA CHAT BOT

# *Backend*



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
```
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

```POST http://localhost:8000/query```

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

## 📄 License
MIT License. Feel free to modify and use.

## 🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.
