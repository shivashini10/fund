"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/global.css";
import "./chatbot.css";
import Footer from "../../components/Footer";

type MessageType = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatbotPage() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<MessageType[]>([
      {
        sender: "bot",
        text:
          "Hello 👋 Welcome to FundLoom Support. How can I help you today?",
      },
    ]);

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user" as const,
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const userInput = message;

    setMessage("");

    try {

      setLoading(true);

      // SIMPLE LOCAL BOT RESPONSES
      let botReply =
        "Sorry, I didn't understand that.";

      const lower =
        userInput.toLowerCase();

      if (
        lower.includes("hello") ||
        lower.includes("hi")
      ) {
        botReply =
          "Hello 👋 How can I help you?";
      }

      else if (
        lower.includes("donate")
      ) {
        botReply =
          "You can donate securely through our campaign pages ❤️";
      }

      else if (
        lower.includes("create")
      ) {
        botReply =
          "To create a campaign, click on 'Start Campaign' and fill in your details.";
      }

      else if (
        lower.includes("refund")
      ) {
        botReply =
          "Refund requests are reviewed within 5-7 business days.";
      }

      else if (
        lower.includes("contact")
      ) {
        botReply =
          "You can contact us at support@fundloom.com";
      }

      else if (
        lower.includes("thanks")
      ) {
        botReply =
          "You're welcome ❤️";
      }

      // FAKE DELAY
      setTimeout(() => {

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: botReply,
          },
        ]);

        setLoading(false);

      }, 800);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }
  };

  return (
    <div className="chatbotPage">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="chatHero">

        <h1>
          AI Chatbot
        </h1>

        <p>
          Ask anything about campaigns,
          donations, fundraising & support ❤️
        </p>

      </div>

      {/* CHAT CONTAINER */}
      <div className="chatContainer">

        {/* CHAT BOX */}
        <div className="chatBox">

          {messages.map(
            (msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "userMessage"
                    : "botMessage"
                }
              >
                {msg.text}
              </div>
            )
          )}

          {loading && (
            <div className="botMessage">
              Typing...
            </div>
          )}

        </div>

        {/* INPUT AREA */}
        <div className="inputArea">

          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
          >
            Send
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}