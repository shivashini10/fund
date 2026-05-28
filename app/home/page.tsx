"use client";

import Image from "next/image";
import "./home.css";
import {
  Users,
  IndianRupee,
  HeartHandshake
} from "lucide-react";

import Navbar from "../../components/Navbar";
import CampaignCard from "../../components/CampaignCard";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {

  const campaigns = [
    {
      title: "Help Aarav's Heart Surgery",
      story:
        "Aarav is suffering from a rare heart condition and needs urgent surgery support.",
      raisedAmount: 235000,
      amount: 400000,
      image: "/images/medical.png",
    },
    {
      title: "Support Education For All",
      story:
        "Help children continue their education with books and learning materials.",
      raisedAmount: 120000,
      amount: 200000,
      image: "/images/education.png",
    },
    {
      title: "Kerala Flood Relief Support",
      story:
        "Support families affected by the Kerala floods with food, shelter, and medicines.",
      raisedAmount: 315000,
      amount: 500000,
      image: "/images/flood.png",
    },
    {
      title: "Help Ramesh Fight Cancer",
      story:
        "Ramesh is battling cancer and needs financial support for cancer treatment.",
      raisedAmount: 480000,
      amount: 700000,
      image: "/images/cancer.png",
    },
  ];

  const router = useRouter();

   const handleProtectedRoute = (path) => {
    const user = localStorage.getItem("fundloom_user");

    if (!user) {
      router.push("/login");
      return;
    }

    router.push(path);
  };

  return (
    <div className="homeContainer">

      <Navbar />

      {/* HERO */}
      <section className="heroSection">

        <div className="heroLeft">

          <div className="heroBadge">
            ❤️ Together, We Can Make a Difference
          </div>

          <h1>
            Raise Funds.
            <br />
            <span>Change Lives.</span>
          </h1>

          <p>
            FundLoom helps individuals and organizations raise
            funds for medical emergencies, education,
            social causes, and more.
          </p>

          <div className="heroButtons">

            <button
              className="secondaryBtn"
              onClick={() => handleProtectedRoute("/create")}
            >
              Start a Campaign
            </button>

            <button
              className="primaryBtn"
              onClick={() => handleProtectedRoute("/donate")}
            >
              Donate Now
            </button>
          </div>

          <div className="statsSection">

            <div className="statIcon">
              <Users size={26} color="#ff7043" strokeWidth={2.5} />
            </div>
            <div className="statCard">
              <h3>10,000+</h3>
              <p>Active Campaigns</p>
            </div>



            <div className="statIcon">
              <IndianRupee size={26} color="#ff7043" strokeWidth={2.5} />
            </div>
            <div className="statCard">
              <h3>₹25 Cr+</h3>
              <p>Funds Raised</p>
            </div>


            <div className="statIcon">
              <HeartHandshake size={26} color="#ff7043" strokeWidth={2.5} />
            </div>
            <div className="statCard">
              <h3>50,000+</h3>
              <p>Happy Donors</p>
            </div>

          </div>

        </div>

        <div className="heroRight">
          <Image
            src="/images/donate.png"
            alt="Donation"
            width={700}
            height={600}
            className="heroImage"
            priority
          />
        </div>

      </section>

      {/* CAMPAIGNS */}
      <section className="campaignSection">

        <div className="sectionHeader">
          <div>
            <h2>Explore Campaigns</h2>
            <p>Discover and support meaningful causes.</p>
          </div>
        </div>

        <div className="campaignGrid">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={campaign}
            />
          ))}
        </div>

      </section>

      <Footer />

    </div>
  );
}