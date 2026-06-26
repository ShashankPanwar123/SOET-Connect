import {
  useState,
  useRef,
  useEffect
} from "react";

import ChatBubble from "../components/ChatBubble";
import chatbotService from "../services/chatbotService";

import "../styles/chat.css";

function AIChat() {

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const bottomRef =
    useRef(null);

  useEffect(() => {

    bottomRef.current?.
      scrollIntoView({
        behavior: "smooth"
      });

  }, [chat]);

  const sendMessage =
    async () => {

      if (!message.trim())
        return;

      const newChat = [

        ...chat,

        {
          sender: "user",
          text: message
        }

      ];

      setChat(newChat);

      const response =
        await chatbotService
        .askQuestion(message);

      setChat([

        ...newChat,

        {
          sender: "bot",
          text: response.answer
        }

      ]);

      setMessage("");

    };

  return (

    <div className="chat-page">

      <h2>
        AI Assistant
      </h2>

      <button
        className="btn btn-danger mb-3"
        onClick={() =>
          setChat([])
        }
      >
        Clear Chat
      </button>

      <div className="chat-box">

        {chat.map(
          (msg, index) => (

            <ChatBubble
              key={index}
              sender={msg.sender}
              message={msg.text}
            />

          )
        )}

        <div ref={bottomRef}></div>

      </div>

      <div className="chat-input">

        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
        />

        <button
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>

  );
}

export default AIChat;