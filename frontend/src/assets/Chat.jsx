import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {

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

    return (
        <div className='input'>
            <button className='chat-button' onClick={SpeechRecognition.startListening}>
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/radio-studio.png" alt="radio-studio" />
            </button>
            <input type='text' onChange={(e) => { setText(e.target.value) }} value={text} />
            <button className='chat-button'>
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/sent.png" alt="sent" />
            </button>
        </div>
    );
};
export default Dictaphone;