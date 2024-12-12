"use client";

import { useState } from "react";
import { handleGenerateText } from "@/app/api/completion/route";
import ReactMarkdown from "react-markdown";
import "./gt.css";

export default function DeviceComparisonPage() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const generatedText = await handleGenerateText(userInput);
    setResponse(generatedText);
    setLoading(false);
  };

  const goBackAndReload = () => {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div>
      <h1 id="title">DEVICE COMPARISION</h1>
      <div className="home-button-container">
        <button onClick={goBackAndReload} className="home-btn">
          HOME
        </button>
      </div>

      <div className="chat-container">
        <h1 id="title">Input devices which you need to compare:</h1>
        <form onSubmit={handleSubmit} className="chat-form">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="EXAMPLE: iPhone 14 vs Galaxy S23"
            rows={4}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Comparing..." : "Compare"}
          </button>
        </form>

        {response && (
          <div className="chat-response">
            <h2>Specifications</h2>
            <div className="chat-message ai">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
