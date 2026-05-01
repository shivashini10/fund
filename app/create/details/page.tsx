"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./details.css";
import Navbar from "../../../components/Navbar";
import "../../../styles/global.css";

export default function CampaignDetails() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // ✅ ALWAYS load latest campaign data
  useEffect(() => {
    const storedData = localStorage.getItem("campaign");

    if (storedData) {
      const parsed = JSON.parse(storedData);

      setTitle(parsed.title || "");
      setAmount(parsed.amount || "");
      setStory(parsed.story || "");
      setImage(parsed.image || "");
    }
  }, []);

  const handleNext = () => {
    if (!title.trim() || !story.trim() || !amount.trim()) {
      setError("Please fill all required fields");
      return;
    }

    setError("");

    const campaignData = {
      title,
      amount,
      story,
      image,
    };

    localStorage.setItem("campaign", JSON.stringify(campaignData));

    router.push("/create/preview");
  };

  return (
    <div className="appContainer">

    <div className="detailsWrapper">
      <Navbar />

      <h2>Create Your Campaign</h2>

      <div className="formGroup">
        <label>Campaign Title *</label>
        <input
          type="text"
          placeholder="Eg: Help me fund my education"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>Amount to be raised *</label>
        <input
          type="number"
          placeholder="Eg: 50000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>Your Story *</label>
        <textarea
          placeholder="Explain your cause..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>Image URL (optional)</label>
        <input
          type="text"
          placeholder="Paste image link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="buttonGroup">
        <button
          className="backBtn"
          onClick={() => router.push("/create")}
        >
          Back
        </button>

        <button className="nextBtn" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
    </div>
  );
}