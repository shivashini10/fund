"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/global.css";
import "./preview.css";

export default function PreviewPage() {
  const router = useRouter();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // SAFE JSON PARSE
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  // LOAD DATA
  useEffect(() => {
    
    const saved = localStorage.getItem("campaign");

    if (!saved) {
      router.push("/create");
      return;
    }

    const parsed = safeParse(saved);

    if (!parsed) {
      router.push("/create");
      return;
    }

    setCampaign(parsed);
  }, [router]);

  // PUBLISH CAMPAIGN
  const publishCampaign = async () => {
  if (!campaign) return;

  try {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/campaigns`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Server error while publishing");
    }

    const result = await res.json();

    const campaignId = result?.campaign?._id;

    const newCampaign = {
      _id: campaignId,
      ...campaign,
    };

    const allCampaigns =
      JSON.parse(localStorage.getItem("allCampaigns")) || [];

    allCampaigns.push(newCampaign);

    localStorage.setItem(
      "allCampaigns",
      JSON.stringify(allCampaigns)
    );

    localStorage.removeItem("campaign");

    setShowPopup(true);

    setTimeout(() => {
      router.push(`/campaigns/${campaignId}`);
    }, 2000);

  } catch (err) {
    console.error("Publish error:", err);
    alert("Failed to publish campaign");
  } finally {
    setLoading(false);
  }
};

  const goBack = () => {
    router.push("/create");
  };

  if (!campaign) {
    return (
      <div className="loadingPage">
        Loading preview...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="previewContainer">

          <h1 className="title">Preview Your Campaign</h1>

          <p className="subtitle">
            Make sure everything looks good before publishing ❤️
          </p>

          {/* CARD */}
          <div className="previewCard">

            {campaign.image && (
              <img
                src={campaign.image}
                alt="campaign"
                className="previewImage"
              />
            )}

            <div className="previewInfo">
              <h2>{campaign.title}</h2>

              <p className="category">
                Category: {campaign.category}
              </p>

              <p className="story">
                {campaign.story}
              </p>

              <p className="goal">
                Goal: ₹{campaign.amount}
              </p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="btnRow">

            <button className="editBtn" onClick={goBack}>
              Edit
            </button>

            <button
              className="publishBtn"
              onClick={publishCampaign}
              disabled={loading}
            >
              {loading
                ? "Publishing..."
                : "Publish Campaign 🚀"}
            </button>

          </div>

        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupBox">

            <h2>Campaign Published!</h2>
            <p>Your campaign is now live 🎉</p>

            <div className="popupLoader"></div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}