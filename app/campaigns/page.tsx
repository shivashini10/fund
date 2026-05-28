"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import CampaignCard from "../../components/CampaignCard";

import "../../styles/global.css";
import "./campaigns.css";

interface Campaign {
  _id: string;
  title: string;
  story: string;
  amount: number;
  category?: string;
}

export default function CampaignsPage() {

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const router = useRouter();

  /* =========================
     FETCH CAMPAIGNS
  ========================= */

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns`)
      .then((res) => res.json())
      .then((data) => {

        const allCampaigns = data.campaigns || [];

        setCampaigns(allCampaigns);
        setFilteredCampaigns(allCampaigns);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  /* =========================
     SEARCH + FILTER
  ========================= */

  useEffect(() => {

    let updated = campaigns;

    // SEARCH
    updated = updated.filter((campaign) =>
      campaign.title.toLowerCase().includes(search.toLowerCase())
    );

    // CATEGORY
    if (selectedCategory !== "All") {

      updated = updated.filter(
        (campaign) => campaign.category === selectedCategory
      );
    }

    setFilteredCampaigns(updated);

  }, [search, selectedCategory, campaigns]);

  return (

    <div className="campaignPage">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="campaignHero">

  <h1>Start Your Campaign</h1>

  <p>
    Raise funds and make a difference ❤️
  </p>

  <button
    className="startBtn"
    onClick={() => router.push("/create-campaign")}
  >
    Start Campaign
  </button>

</section>

      {/* STATS */}
      <section className="statsWrapper">

        <div className="statCard">

          <h2>{campaigns.length}+</h2>

          <p>Active Campaigns</p>

        </div>

        <div className="statCard">

          <h2>₹25L+</h2>

          <p>Funds Raised</p>

        </div>

        <div className="statCard">

          <h2>5K+</h2>

          <p>Happy Donors</p>

        </div>

      </section>

      {/* TRENDING */}
      <section className="trendingBanner">

        <h2>🔥 Trending Campaigns</h2>

        <p>
          Discover the most supported fundraisers today
        </p>

      </section>

      {/* SEARCH */}
      <div className="searchWrapper">

        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchInput"
        />

      </div>

      {/* CATEGORY */}
      <div className="categoryWrapper">

        {["All", "Medical", "Education", "Animals", "Emergency"].map((cat) => (

          <button
            key={cat}
            className={`categoryBtn ${
              selectedCategory === cat ? "activeCategory" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>

        ))}

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="loadingBox">
          Loading campaigns...
        </div>

      ) : (

        <div className="campaignGrid">

          {filteredCampaigns.length > 0 ? (

            filteredCampaigns.map((c) => (

              <div
                key={c._id}
                className="campaignItem"
                onClick={() => router.push(`/campaigns/${c._id}`)}
              >

                <CampaignCard
                  title={c.title}
                  story={c.story}
                  amount={c.amount}
                />

              </div>

            ))

          ) : (

            <div className="emptyBox">

              <h2>No campaigns found ❤️</h2>

              <button
                className="startBtn"
                onClick={() => router.push("/create-campaign")}
              >
                Be the First
              </button>

            </div>

          )}

        </div>

      )}

    </div>
  );
}