"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import "./details.css";
import "../../styles/global.css";

type BeneficiaryType =
  | ""
  | "myself"
  | "family-individual"
  | "family-group"
  | "friends-individual"
  | "friends-group"
  | "others-individual"
  | "others-group"
  | "ngo";

export default function Create() {
  const [selected, setSelected] =
    useState<BeneficiaryType>("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSelect = (
    value: BeneficiaryType
  ) => {
    setSelected(value);
    setError("");
  };

  const handleContinue = () => {

    // Validation
    if (!selected) {
      setError(
        "Please select who the fundraiser is for"
      );
      return;
    }

    // Store selection
    localStorage.setItem(
      "beneficiary",
      selected
    );

    // Redirect to NEXT PAGE
    router.push("/preview");
  };

  return (
    <div className="page">

      <Navbar />

      {/* TOP */}
      <div className="topBox">
        <h3>Beneficiary Details</h3>
      </div>

      <p className="subtitle">
        This fundraiser will benefit
      </p>

      {/* MAIN CARD */}
      <div
        className={`maincard ${
          error ? "maincardError" : ""
        }`}
      >

        {/* Myself */}
        <div className="group">
          <p className="groupTitle">
            Myself
          </p>

          <div className="btnRow">
            <button
              type="button"
              className={
                selected === "myself"
                  ? "activeBtn"
                  : ""
              }
              onClick={() =>
                handleSelect("myself")
              }
            >
              👤 Myself
            </button>
          </div>
        </div>

        {/* Family */}
        <div className="group">
          <p className="groupTitle">
            My family{" "}
            <span>
              next of kin & relatives
            </span>
          </p>

          <div className="btnRow">

            <button
              type="button"
              className={
                selected ===
                "family-individual"
                  ? "activeBtn"
                  : ""
              }
              onClick={() =>
                handleSelect(
                  "family-individual"
                )
              }
            >
              👤 Individual
            </button>

            <button
              type="button"
              className={
                selected === "family-group"
                  ? "activeBtn"
                  : ""
              }
              onClick={() =>
                handleSelect(
                  "family-group"
                )
              }
            >
              👥 Group
            </button>

          </div>
        </div>

        {/* Friends */}
        <div className="group">
          <p className="groupTitle">
            My friends{" "}
            <span>
              classmates, colleagues &
              people I know
            </span>
          </p>

          <div className="btnRow">

            <button
              type="button"
              className={
                selected ===
                "friends-individual"
                  ? "activeBtn"
                  : ""
              }
              onClick={() =>
                handleSelect(
                  "friends-individual"
                )
              }
            >
              👤 Individual
            </button>

            <button
              type="button"
              className={
                selected === "friends-group"
                  ? "activeBtn"
                  : ""
              }
              onClick={() =>
                handleSelect(
                  "friends-group"
                )
              }
            >
              👥 Group
            </button>

          </div>
        </div>

        {/* Others */}
        <div className="group">
          <p className="groupTitle">
            Others{" "}
            <span>
              people, animals,
              communities etc
            </span>
          </p>

          <div className="btnRow">

            <button
              type="button"
              className={
                selected ===
                "others-individual"
                  ? "activeBtn"
                  : ""
              }
              onClick={() =>
                handleSelect(
                  "others-individual"
                )
              }
            >
              👤 Individual
            </button>

            <button
              type="button"
              className={
                selected === "others-group"
                  ? "activeBtn"
                  : ""
              }
              onClick={() =>
                handleSelect(
                  "others-group"
                )
              }
            >
              👥 Group
            </button>

          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* NGO */}
        <div
          className={`ngo ${
            selected === "ngo"
              ? "activeBtn"
              : ""
          }`}
          onClick={() =>
            handleSelect("ngo")
          }
        >
          <h4>🏢 Registered NGO</h4>

          <p>
            A registered not-for-profit
            that has a valid PAN card
            issued in its name
          </p>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* BOTTOM BUTTON */}
      <div className="bottomBar">

        <button
          type="button"
          className="continueBtn"
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>

    </div>
  );
}