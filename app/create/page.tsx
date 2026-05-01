"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./create.css";
import Navbar from "../../components/Navbar";
import "../../styles/global.css";

export default function Create() {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSelect = (value: string) => {
    setSelected(value);
    setError("");
  };

  const handleContinue = async () => {
    if (!selected) {
      setError("Please select who the fundraiser is for");
      return;
    }

    setError("");

    // 🔥 STORE IN LOCAL STATE (TEMP until DB step)
    const beneficiaryData = {
      beneficiary: selected,
    };

    // Optional: keep for now (you will remove later)
    localStorage.setItem("beneficiary", selected);

    // 🔥 READY FOR MONGODB (future use)
    // You can send this to backend API later if needed
    /*
    await fetch("/api/beneficiary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beneficiaryData),
    });
    */

    router.push("/create/details");
  };

  return (
    <div className="page">

      <Navbar />

      <div className="topBox">
        <h3>Beneficiary Details</h3>
      </div>

      <p className="subtitle">
        This fundraiser will benefit
      </p>

      <div className={`maincard ${error ? "maincardError" : ""}`}>

        {/* Myself */}
        <div className="group">
          <p className="groupTitle">Myself</p>

          <div className="btnRow">
            <button
              className={selected === "myself" ? "activeBtn" : ""}
              onClick={() => handleSelect("myself")}
            >
              👤 Myself
            </button>
          </div>
        </div>

        {/* Family */}
        <div className="group">
          <p className="groupTitle">
            My family <span>next of kin & relatives</span>
          </p>

          <div className="btnRow">
            <button
              className={selected === "family-individual" ? "activeBtn" : ""}
              onClick={() => handleSelect("family-individual")}
            >
              👤 Individual
            </button>

            <button
              className={selected === "family-group" ? "activeBtn" : ""}
              onClick={() => handleSelect("family-group")}
            >
              👥 Group
            </button>
          </div>
        </div>

        {/* Friends */}
        <div className="group">
          <p className="groupTitle">
            My friends <span>classmates, colleagues & people I know</span>
          </p>

          <div className="btnRow">
            <button
              className={selected === "friends-individual" ? "activeBtn" : ""}
              onClick={() => handleSelect("friends-individual")}
            >
              👤 Individual
            </button>

            <button
              className={selected === "friends-group" ? "activeBtn" : ""}
              onClick={() => handleSelect("friends-group")}
            >
              👥 Group
            </button>
          </div>
        </div>

        {/* Others */}
        <div className="group">
          <p className="groupTitle">
            Others <span>people, animals, communities etc</span>
          </p>

          <div className="btnRow">
            <button
              className={selected === "others-individual" ? "activeBtn" : ""}
              onClick={() => handleSelect("others-individual")}
            >
              👤 Individual
            </button>

            <button
              className={selected === "others-group" ? "activeBtn" : ""}
              onClick={() => handleSelect("others-group")}
            >
              👥 Group
            </button>
          </div>
        </div>

        <div className="divider"></div>

        {/* NGO */}
        <div
          className={`ngo ${selected === "ngo" ? "activeBtn" : ""}`}
          onClick={() => handleSelect("ngo")}
        >
          <h4>🏢 Registered NGO</h4>
          <p>
            A registered not-for-profit that has a valid PAN card issued in its name
          </p>
        </div>

      </div>

      {error && <p className="error">{error}</p>}

      <div className="bottomBar">
        <button
          className="continueBtn"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>

    </div>
  );
}