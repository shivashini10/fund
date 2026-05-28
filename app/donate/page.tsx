"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./donate.css";

export default function DonatePage() {
  const router = useRouter();

  const [amount, setAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    payment: "UPI",
  });

  const [campaign, setCampaign] = useState<any>(null);
  const [allCampaigns, setAllCampaigns] = useState<any[]>([]);
  const [error, setError] = useState("");

  // LOAD DATA
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedCampaigns = localStorage.getItem("allCampaigns");
    if (savedCampaigns) {
      setAllCampaigns(JSON.parse(savedCampaigns));
    }

    const selectedCampaign = localStorage.getItem("selectedCampaign");
    if (selectedCampaign) {
      setCampaign(JSON.parse(selectedCampaign));
    }
  }, []);

  // AMOUNT SELECT
  const handleAmountClick = (value: any) => {
    if (value === "custom") {
      setShowCustom(true);
      setAmount(0);
    } else {
      setShowCustom(false);
      setAmount(value);
      setCustomAmount("");
    }
  };

  // INPUT CHANGE
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // FINAL AMOUNT
  const finalAmount =
    showCustom && Number(customAmount) > 0
      ? Number(customAmount)
      : amount;

  // DONATE FUNCTION
  const handleDonate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!campaign) {
      setError("⚠️ Please select a campaign");
      return;
    }

    if (!form.name || !form.email) {
      setError("⚠️ Please fill all fields");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError("⚠️ Please enter a valid email address");
      return;
    }

    const amountToDonate =
      showCustom ? Number(customAmount) : amount;

    if (!amountToDonate || amountToDonate <= 0) {
      setError("⚠️ Enter a valid donation amount");
      return;
    }

    setError("");

    // GET ALL CAMPAIGNS
    const campaigns =
      JSON.parse(localStorage.getItem("allCampaigns") || "[]");

    // UPDATE CAMPAIGNS
    const updatedCampaigns = campaigns.map((item: any) => {
      if (String(item._id) === String(campaign._id)) {
        return {
          ...item,
          raised: (item.raised || 0) + amountToDonate,
          donors: (item.donors || 0) + 1,
        };
      }
      return item;
    });

    localStorage.setItem(
      "allCampaigns",
      JSON.stringify(updatedCampaigns)
    );

    const updatedCurrent = updatedCampaigns.find(
      (c: any) => String(c._id) === String(campaign._id)
    );

    localStorage.setItem(
      "selectedCampaign",
      JSON.stringify(updatedCurrent)
    );

    // STORE DONATION
    localStorage.setItem(
      "lastDonation",
      JSON.stringify({
        name: form.name,
        email: form.email,
        payment: form.payment,
        amount: amountToDonate,
        campaignTitle: campaign.title,
        transactionId: "TXN" + Date.now(),
        date: new Date().toLocaleDateString(),
      })
    );

    router.push("/payment-success");
  };

  return (
    <>
      <Navbar />

      <section className="donateHero">
        <h1>Make a Donation</h1>
        <p>Your contribution can change someone's life ❤️</p>
      </section>

      <div className="donatePageSingle">
        <div className="donateCard">

          {/* CAMPAIGN PREVIEW */}
          {campaign && (
            <div className="campaignPreview">
              {campaign.image && (
                <img src={campaign.image} alt="campaign" />
              )}
              <h3>{campaign.title}</h3>
              <p>{campaign.category}</p>
              <p>Goal: ₹{campaign.amount}</p>
              <p>Raised: ₹{campaign.raised || 0}</p>
            </div>
          )}

          <h2>Complete Your Donation</h2>

          {/* AMOUNT */}
          <div className="amountBox">
            {[50, 100, 500].map((val) => (
              <button
                key={val}
                className={amount === val ? "active" : ""}
                onClick={() => handleAmountClick(val)}
              >
                ₹{val}
              </button>
            ))}

            <button
              className={showCustom ? "active" : ""}
              onClick={() => handleAmountClick("custom")}
            >
              Custom
            </button>
          </div>

          {/* CUSTOM AMOUNT */}
          {showCustom && (
            <div className="inputGroup">
              <label>Custom Amount *</label>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (Number(value) < 0) return;
                  setCustomAmount(value);
                }}
              />
            </div>
          )}

          {/* FORM */}
          <div className="donateForm">

            {/* NAME */}
            <div className="inputGroup">
              <label>Donor Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="inputGroup">
              <label>Email *</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* PAYMENT */}
            <div className="paymentOptions">
              {["📱 UPI", "💳 Card", "🏦 Net Banking"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={form.payment === type ? "active" : ""}
                  onClick={() =>
                    setForm({ ...form, payment: type })
                  }
                >
                  {type}
                </button>
              ))}
            </div>

            {/* ERROR */}
            {error && (
              <p className="errorText">{error}</p>
            )}

            {/* BUTTON */}
            <button
              className="donateBtn"
              onClick={handleDonate}
            >
              Donate ₹{finalAmount || 0}
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}