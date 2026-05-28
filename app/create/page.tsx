"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./create.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function CreateCampaignPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    story: "",
  });

  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  // RESTORE DATA (EDIT MODE)
  useEffect(() => {
    const saved = localStorage.getItem("campaign");

    if (saved) {
      const data = JSON.parse(saved);

      setFormData({
        title: data.title || "",
        category: data.category || "",
        amount: data.amount || "",
        story: data.story || "",
      });

      if (data.image) {
        setPreview(data.image);
      }
    }
  }, []);

  // HANDLE INPUT
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // IMAGE UPLOAD
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    }
  };

  // SUBMIT
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const amountValue = Number(formData.amount);

    // VALIDATION
    if (!formData.title || !formData.category || !formData.amount) {
      setError("Please fill all required fields (*)");
      return;
    }

    if (amountValue <= 0) {
      setError("Goal amount must be greater than 0");
      return;
    }

    setError("");

    const campaignData = {
      ...formData,
      amount: amountValue,
      image: preview,
      _id: Date.now().toString(),
      raised: 0,
      donors: 0,
    };

    // SAVE CURRENT CAMPAIGN
    localStorage.setItem("campaign", JSON.stringify(campaignData));

    // SAVE TO ALL CAMPAIGNS
    const existing =
      JSON.parse(localStorage.getItem("allCampaigns") || "[]");

    localStorage.setItem(
      "allCampaigns",
      JSON.stringify([...existing, campaignData])
    );

    // REDIRECT
    router.push("/preview");
  };

  return (
    <div className="createCampaignPage">
      <Navbar />

      <section className="createHero">
        <h1>Start a Campaign</h1>
        <p>Raise funds and bring hope to people in need ❤️</p>
      </section>

      <div className="createWrapper">
        <div className="formContainer">

          <form onSubmit={handleSubmit}>

            {/* TITLE */}
            <div className="formGroup">
              <label>Campaign Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* CATEGORY */}
            <div className="formGroup">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Medical">❤️ Medical</option>
                <option value="Education">📚 Education</option>
                <option value="Flood Relief">🌊 Flood Relief</option>
                <option value="Emergency">🚨 Emergency</option>
                <option value="Animals">🐶 Animals</option>
              </select>
            </div>

            {/* GOAL AMOUNT */}
            <div className="formGroup">
              <label>Goal Amount *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                min="1"
                onChange={(e) => {
                  const value = e.target.value;

                  if (Number(value) < 0) return;

                  setFormData({
                    ...formData,
                    amount: value,
                  });
                }}
              />
            </div>

            {/* IMAGE */}
            <div className="formGroup">
              <label>Campaign Image</label>

              <div className="uploadBox">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
                <p>Upload campaign image</p>
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="previewImage"
                />
              )}
            </div>

            {/* STORY */}
            <div className="formGroup">
              <label>Story</label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                rows={6}
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="error">{error}</p>
            )}

            {/* BUTTON */}
            <button type="submit" className="createBtn">
              Create Campaign
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
}