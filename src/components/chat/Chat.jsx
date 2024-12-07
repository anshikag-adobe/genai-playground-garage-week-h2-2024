import './chat.css';
import Input from "../input/Input.jsx";
import {useSelector} from "react-redux";
import ReactMarkdown from 'react-markdown';
import {useEffect, useRef} from "react";


const Chat = () => {
    const chatEnd = useRef(null);
    const messages = useSelector(state => state.playground.messages);

    useEffect(() => {
        chatEnd.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <div className={"chat-playground-arena"}>
            <div className={"chat-viewer"}>
                {messages.map((message, index) => {
                    return (
                        <div key={index} className={`chat-message ${message.isBot ? 'chat-response' : 'chat-prompt'}`}>
                            { message.isBot ? <ReactMarkdown>{message.text}</ReactMarkdown> : message.text}
                        </div>
                    );
                })}
                <div ref={chatEnd}/>
            </div>
            <Input/>
        </div>
    );
};

export default Chat;