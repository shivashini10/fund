"use client";

import { useEffect, useState } from "react";

import Navbar from "../../../components/Navbar";

import "./../dashboard.css";
import "../../../styles/global.css";

export default function UserDashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data.campaigns || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const totalCampaigns = campaigns.length;

  const totalRaised = campaigns.reduce(
    (acc, item) =>
      acc + (item.raisedAmount || 0),
    0
  );

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div className="dashboard-header">

        <h1>User Dashboard</h1>

        <p>
          Track your fundraising campaigns
        </p>

      </div>

      {/* Stats */}
      <div className="stats-grid">

        <div className="stats-card">
          <h2>{totalCampaigns}</h2>
          <p>Your Campaigns</p>
        </div>

        <div className="stats-card">
          <h2>₹{totalRaised}</h2>
          <p>Total Raised</p>
        </div>

      </div>

      {/* Campaigns */}
      <div className="campaign-section">

        <div className="section-title">
          <h2>Your Campaigns</h2>
        </div>

        {loading ? (
          <p className="loadingText">
            Loading campaigns...
          </p>
        ) : campaigns.length === 0 ? (
          <p className="loadingText">
            No campaigns available
          </p>
        ) : (
          <div className="campaign-grid">

            {campaigns.map((c: any) => {

              const progress =
                ((c.raisedAmount || 0) /
                  c.amount) *
                100;

              return (
                <div
                  key={c._id}
                  className="campaign-card"
                >

                  <img
                    src={
                      c.image ||
                      "/images/campaign-banner.jpg"
                    }
                    alt={c.title}
                    className="campaign-image"
                  />

                  <div className="campaign-content">

                    <h3>{c.title}</h3>

                    <p className="story">
                      {c.story}
                    </p>

                    <div className="campaign-info">

                      <p>
                        <strong>Goal:</strong>
                        {" "}₹{c.amount}
                      </p>

                      <p>
                        <strong>Raised:</strong>
                        {" "}
                        ₹{c.raisedAmount || 0}
                      </p>

                      <p>
                        <strong>Beneficiary:</strong>
                        {" "}
                        {c.beneficiary}
                      </p>

                    </div>

                    {/* Progress */}
                    <div className="progressBar">
                      <div
                        className="progressFill"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}