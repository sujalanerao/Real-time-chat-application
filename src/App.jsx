import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { text: "SYSTEM ONLINE. GREETINGS, HUMAN.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // 2. Robot Reply (Simulated)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "COMMAND RECEIVED: " + input.toUpperCase(), 
        sender: "bot" 
      }]);
    }, 800);
  };

  return (
    <div className="chat-container">
      <div className="header">
        <div className="status-light"></div>
        <h2>AI_CHAT_TERMINAL</h2>
      </div>

      <div className="message-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="label">[{msg.sender === 'bot' ? 'SYSTEM' : 'USER'}]:</span>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} className="input-area">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type command here..." 
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
}

export default App;