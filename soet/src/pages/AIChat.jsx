import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBubble from "../components/ChatBubble";
import chatbotService from "../services/chatbotService";
import "../styles/chat.css";

function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

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
        {
          sender: "bot",
          text: response.answer || response.reply || "I could not find an answer. Please contact the administration."
        }
      ]);
    } catch (error) {
      console.error(error);
      setChat([
        ...newChat,
        {
          sender: "bot",
          text: "Error: Could not reach the chatbot server. Please ensure the backend is running."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>AI Assistant</h2>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => setChat([])}
            >
              Clear Chat
            </button>
          </div>

          <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="chat-box" style={{ height: "450px", padding: "20px" }}>
              {chat.length === 0 && (
                <div className="text-center text-muted py-5">
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>💬</div>
                  <p>Ask me about college rules, exam schedules, registration, or any academic policies.</p>
                </div>
              )}

              {chat.map((msg, index) => (
                <ChatBubble
                  key={index}
                  sender={msg.sender}
                  message={msg.text}
                />
              ))}

              {loading && (
                <div className="bot-message" style={{ maxWidth: "80px", display: "inline-block" }}>
                  <span>● ● ●</span>
                </div>
              )}

              <div ref={bottomRef}></div>
            </div>

            <div className="chat-input" style={{ padding: "15px", borderTop: "1px solid #e9ecef", background: "white" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Type your question and press Enter..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                className="btn btn-primary ms-2"
                onClick={sendMessage}
                disabled={loading || !message.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AIChat;