import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from "react-text-to-speech";

// import chats from './chat_app'
import Chat from './Chat'


const ChatInterface = (props) => {

    const [chatId, setChatId] = useState(0);
    const [chats, setChats] = useState(props.chats);
    const [messages, setMessages] = useState(chats[chatId].messages);

    const [text, setText] = useState('')

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        alert("Browser doesn't support speech recognition.");
        return null;
    }

    useEffect(() => {
        setText(text + " " + transcript)
    }, [transcript, setText])


    useEffect(() => {
        setChats(props.chats);
    }, [props.chats]);


    useEffect(() => {
        setMessages(chats[chatId].messages);
    }, [chats, chatId]);

    const sendMessage = () => {
        if (text.length > 0) {
            fetch("http://localhost:8000/query", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    prompt: text,
                    user: props.email
                })
            })
                .then(console.warn("sendmessage APi Called"))
                .then(response => response.json())
                .then(data => {
                    console.log("response received:");
                    console.log(data);
                    console.log("response end");

                    setChats(data.message.chats)

                    console.log("messages should be updated");


                    setText('')
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const newChat = () => {
        if (messages.length > 0) {
            setChats([...chats, { "chat_id": chats.length, "messages": [] }]);
            setChatId(chats.length)
        }
    }

    const handleLogOut = () => {
        props.setUser(false);
        setChats([]);
    }

    return (
        <div className='chat-interface'>
            <div className="chats">
                <h3>Chats</h3>
                <div className="chat-buttons">
                    <button className='chat-button' onClick={newChat}>New Chat</button>
                    {
                        chats.map(chat => {
                            return (
                                <button className={`chat-button  ${chat["chat_id"] == chatId ? "active_chat" : ""}`} onClick={() => {
                                    setChatId(chat["chat_id"])
                                }}>Chat {chat["chat_id"]+1}</button>
                            )
                        })
                    }
                </div>
                <button className='chat-button' onClick={handleLogOut}>Log out</button>
            </div>
            <div className="messages-container">
                <div className="messages">
                    <div className="message-container">
                        {messages.map(chat => {
                            return (
                                <div className=''>
                                    <div className="me-container">
                                        <div className="me message">
                                            {chat.prompt}
                                            <Speech text={chat.prompt} />
                                        </div>
                                        <img width="48" height="48" src="https://img.icons8.com/fluency-systems-filled/48/228BE6/user-male-circle.png" alt="user-male-circle" />
                                    </div>
                                    <div className="ai-container">
                                        <img width="48" height="48" src="https://img.icons8.com/fluency/48/chatbot--v1.png" alt="chatbot--v1" />
                                        <div className="ai message">
                                            {chat.response}
                                            <Speech text={chat.response} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='input'>
                    <button className='chat-button' onClick={SpeechRecognition.startListening}>
                        <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/radio-studio.png" alt="radio-studio" />
                    </button>
                    <input type='text' onChange={(e) => { setText(e.target.value) }} value={text} />
                    <button className='chat-button' onClick={sendMessage}>
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/sent.png" alt="sent" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface
