"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./success.css";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastDonation");

    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="successPage">
        <div className="successCard">

          <div className="checkCircle">✓</div>

          <h1>Thank You For Your Donation!</h1>

          <p>Your donation has been successfully processed.</p>

          <div className="transactionBox">
            <span>Transaction ID</span>
            <strong>{data.transactionId}</strong>
          </div>

          <div className="details">

            <div className="detailRow">
  <span>Campaign</span>
  <span>{data.campaignTitle}</span>
</div>

            <div className="detailRow">
              <span>Amount</span>
              <span>₹{data.amount}</span>
            </div>

            <div className="detailRow">
              <span>Payment Method</span>
              <span>{data.payment}</span>
            </div>

            <div className="detailRow">
              <span>Date</span>
              <span>{data.date}</span>
            </div>

          </div>

          <div className="btnGroup">
            <button
              className="homeBtn"
              onClick={() => (window.location.href = "/home")}
            >
              Back To Home
            </button>

            <button
  className="campaignBtn"
  onClick={() => {
    const last = JSON.parse(
      localStorage.getItem("lastDonation") || "{}"
    );

    const campaigns =
      JSON.parse(localStorage.getItem("allCampaigns") || "[]");

    const campaign = campaigns.find(
      (c) => c.title === last.campaignTitle
    );

    if (campaign) {
      router.push(`/campaigns/${campaign._id}`);
    }
  }}
>
  View Campaign
</button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}