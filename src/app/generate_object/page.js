"use client";
import { useState, useEffect, useRef } from "react";
import { handleGenerateProduct } from "@/app/api/genobject/route";
import Markdown from "react-markdown";
import "./g.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [productData, setProductData] = useState({
    productTitle: "Enter a product.",
    breakdownSteps: [],
  });
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      const generatedProduct = await handleGenerateProduct(input);
      setProductData(
        generatedProduct || {
          productTitle: "Error: Could not generate product information.",
          breakdownSteps: [],
        }
      );
      setInput("");
    } else {
      alert("Please enter a product.");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [productData]);

  return (
    <div className="layout-container">
      <header className="header">Product Analyser</header>
      <p id="info">This chatbot will tell you the ingridients and chemicals used in a consumer product</p>
      <main>
        <div className="project-container" ref={chatContainerRef}>
          <h1>{productData.productTitle}</h1>
          <div className="project-steps">
            {productData.breakdownSteps.map((step, index) => (
              <div key={index} className="project-step">
                <div className="ingi">
                  <h2>INGREDIENTS:</h2>
                  <p>{step.ingridients}</p>
                </div>
                <div className="hc">
                  <h2>HARMFUL CHEMICALS:</h2>
                  <Markdown>{step.harmfullchemicals}</Markdown>
                </div>
                {step.healthissue && (
                  <div className="code-snippet">
                    <h2>HEALTH ISSUE:</h2>
                    <p>{step.healthissue}</p>
                  </div>
                )}
                {step.suggestion && (
                  <div className="resources">
                    <h2>HELPFUL SUGGESTION:</h2>
                    <p>{step.suggestion}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a product"
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M9 18l6-6-6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
}
