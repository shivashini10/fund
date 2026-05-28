"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import "../campaigns.css";

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const allCampaigns =
      JSON.parse(localStorage.getItem("allCampaigns")) || [];

    console.log("URL ID:", id);
    console.log("ALL CAMPAIGNS:", allCampaigns);

    const found = allCampaigns.find(
      (item) => String(item._id) === String(id)
    );

    setCampaign(found || null);
    setLoading(false);
  }, [id]);

  // LOADING STATE
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loadingPage">Loading Campaign...</div>
        <Footer />
      </>
    );
  }

  // NOT FOUND STATE
  if (!campaign) {
    return (
      <>
        <Navbar />
        <div className="loadingPage">Campaign not found</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="campaignPage">

        <div className="campaignHero">

          <h1 className="title">Recent Campaign</h1>

          {/* IMAGE */}
          {campaign?.image && (
            <img
              src={campaign.image}
              alt="campaign"
              className="campaignImage"
            />
          )}

          <div className="campaignContent">

            <span className="category">
              {campaign?.category}
            </span>

            <h1>{campaign?.title}</h1>

            <p className="story">
              {campaign?.story}
            </p>

            {/* STATS */}
            <div className="statsRow">

              <div className="statsCard">
                <h3>Goal Amount</h3>
                <p>₹{campaign?.amount}</p>
              </div>

              <div className="statsCard">
                <h3>Raised</h3>
                <p>₹{campaign.raised || 0}</p>
              </div>

              <div className="statsCard">
                <h3>Donors</h3>
                <p>{campaign.donors || 0}</p>
              </div>

            </div>

            {/* PROGRESS */}
            <div className="progressSection">

              <div className="progressTop">

  <span>
    {Math.min(
      Math.round(
        ((campaign.raised || 0) / campaign.amount) * 100
      ),
      100
    )}
    % Funded
  </span>

  <span>
    ₹{campaign.raised || 0} Raised
  </span>

</div>

              <div className="progressBar">
                <div
  className="progressFill"
  style={{
    width: `${Math.min(
      ((campaign.raised || 0) / campaign.amount) * 100,
      100
    )}%`,
  }}
></div>
              </div>

            </div>

            {/* BUTTON */}
<button
  className="donateNowBtn"
  onClick={() => {
    localStorage.setItem(
      "selectedCampaign",
      JSON.stringify(campaign)
    );

    router.push("/donate");
  }}
>
  Donate Now ❤️
</button>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}