"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import "./s.css";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const goBackAndReload = () => {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <>
      <div className="home-button-container">
        <button onClick={goBackAndReload} className="home-btn">
          HOME
        </button>
      </div>
      <div className="title">PETCARE</div>
      <div className="container">
        <div className="chat-box">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`whitespace-pre-wrap ${
                m.role === "user" ? "user" : "ai"
              }`}
            >
              {m.role === "user" ? (
                m.content
              ) : (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="input"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}
