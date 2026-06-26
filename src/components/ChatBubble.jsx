function ChatBubble({
  sender,
  message
}) {

  return (

    <div
      className={
        sender === "user"
          ? "user-message"
          : "bot-message"
      }
    >

      {message}

    </div>

  );
}

export default ChatBubble;