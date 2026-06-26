import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import chatbotService from "../services/chatbotService";
import "../styles/chat-widget.css";

function ChatWidget() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, isOpen, loading]);

  // If there is no user session, do not render the widget
  if (!user) return null;

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userText = message;
    setMessage("");

    const newChat = [...chat, { sender: "user", text: userText }];
    setChat(newChat);
    setLoading(true);

    try {
      const response = await chatbotService.askQuestion(userText);
      setChat([
        ...newChat,
        { sender: "bot", text: response.answer || response.reply || "I am unable to answer that at the moment." }
      ]);
    } catch (err) {
      console.error(err);
      setChat([
        ...newChat,
        { sender: "bot", text: "Error: I am unable to connect to the chatbot server. Please ensure the backend is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-widget-header">
            <div>
              <h5>SOET AI Assistant</h5>
              <small>College Rules & FAQ Support</small>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          <div className="chat-widget-body">
            {chat.length === 0 && (
              <div className="chat-welcome">
                <p>Hello, <strong>{user.name}</strong>! Ask me any institutional or academic questions.</p>
                <small>Try: "What are the rules for exams?" or "How can I register?"</small>
              </div>
            )}

            {chat.map((msg, index) => (
              <div
                key={index}
                className={`chat-message-bubble ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble-loading">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          <div className="chat-widget-footer">
            <input
              type="text"
              placeholder="Ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}

      <button className="chat-widget-fab" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span style={{ fontSize: "22px" }}>&times;</span> : "💬"}
      </button>
    </div>
  );
}

export default ChatWidget;
