"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./preview.css";
import Navbar from "../../../components/Navbar";
import "../../../styles/global.css";

export default function PreviewPage() {
  const [data, setData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const router = useRouter();

  // ✅ Load campaign data
  useEffect(() => {
    const stored = localStorage.getItem("campaign");
    const recent = localStorage.getItem("recentCampaign");

    if (stored) {
      setHasDraft(true);
      setData(JSON.parse(stored));
    } else if (recent) {
      setHasDraft(false);
      setData(JSON.parse(recent));
    }
  }, []);

  // ✅ SUBMIT → SAVE TO MONGODB
  const handleSubmit = async () => {
    if (!data) return;

    try {
      // ✅ Get beneficiary from localStorage
      const beneficiary = localStorage.getItem("beneficiary");

      // ✅ Validation
      if (!data.title || !data.story || !data.amount || !beneficiary) {
        alert("Please fill all required fields");
        return;
      }

     const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/campaign`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      story: data.story,
      amount: Number(data.amount),
      image: data.image || "",
      beneficiary: beneficiary,
    }),
  }
);

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save");
      }

      console.log("Saved to MongoDB:", result);

      // ✅ Save for UI display
      localStorage.setItem("recentCampaign", JSON.stringify(result));

      // ✅ Clear draft
      localStorage.removeItem("campaign");
      localStorage.removeItem("beneficiary");

      // ✅ Show success popup
      setShowPopup(true);

    } catch (err: any) {
      console.error("Submit error:", err);
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="appContainer">
      <div className="previewWrapper">
        <Navbar />

        <h2>Preview Your Campaign</h2>

        {/* ✅ Show recent campaign message */}
        {!hasDraft && data && (
          <p style={{ textAlign: "left", color: "black", fontSize: "18px" }}>
            ✅ Recently submitted campaign
          </p>
        )}

        {/* ✅ SHOW DATA */}
        {data && (
          <div className="previewCard">
            {data.image && (
              <img
                src={data.image}
                alt="campaign"
                className="previewImage"
              />
            )}

            <h3 className="previewTitle">{data.title}</h3>
            <p className="previewAmount">₹{data.amount}</p>
            <p className="previewStory">{data.story}</p>
          </div>
        )}

        {/* ✅ BUTTONS */}
        {!showPopup && hasDraft && (
          <div className="previewButtons">
            <button
              className="editBtn"
              onClick={() => router.push("/create/details")}
            >
              Edit
            </button>

            <button
              className="submitBtn"
              onClick={handleSubmit}
            >
              Submit Campaign
            </button>
          </div>
        )}

        {/* ✅ SUCCESS POPUP */}
        {showPopup && (
          <div className="popupOverlay">
            <div className="popupBox">
              <h2>🎉 Congratulations!</h2>
              <p>Your campaign has been submitted successfully.</p>

              <button
                className="popupBtn"
                onClick={() => router.push("/create")}
              >
                Add Fundraiser
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}