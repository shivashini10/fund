"use client";

import { useState } from "react";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const sendTicket = async () => {
    if (!subject || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send ticket");
      }

      setSuccess("✅ Support ticket sent successfully");

      setSubject("");
      setMessage("");

    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px 20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#FF8A65",
            marginBottom: "10px",
          }}
        >
          Support Center
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
            fontSize: "14px",
          }}
        >
          Need help? Send us your issue
        </p>

        {/* Subject */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Message */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Message
          </label>

          <textarea
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              minHeight: "140px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "14px",
              resize: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Success Message */}
        {success && (
          <p
            style={{
              color: "#16a34a",
              marginBottom: "15px",
              fontWeight: "500",
            }}
          >
            {success}
          </p>
        )}

        {/* Button */}
        <button
          onClick={sendTicket}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "14px",
            background: "#FF8A65",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Sending..." : "Send Ticket"}
        </button>
      </div>
    </div>
  );
}