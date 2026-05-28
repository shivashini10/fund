"use client";

import { useState } from "react";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: msg }),
});

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>Ask</button>

      <p>{reply}</p>
    </div>
  );
}