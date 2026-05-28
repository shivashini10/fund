"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/global.css";
import "./contact.css";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+91 9876543210");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setError("");
    setSuccess("");
  };

  // EMAIL VALIDATION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const send = async () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError("Please fill all fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
});

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setShowPopup(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setShowPopup(false);
      }, 2500);

    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contactPage">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="contactHero">
        <h1>Contact FundLoom</h1>
        <p>We’d love to hear from you ❤️</p>
      </div>

      {/* CONTAINER */}
      <div className="contactContainer">

        {/* LEFT INFO */} <div className="contactInfo"> <h2>Get in Touch</h2> <p> Have questions about campaigns, donations, or fundraising? Reach out to us anytime. </p> <div className="infoBox"> <div className="infoItem"> <span>📧</span> <p> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@fundloom.com" target="_blank"> support@fundloom.com </a> </p> </div> <div className="infoItem"> <span>📞</span> <p onClick={handleCopy} style={{ cursor: "pointer" }}> +91 9876543210 {copied && (<span style={{ backgroundColor: "black", color: "white", marginLeft: "10px", padding: "3px", fontSize: "12px", borderRadius: "5px" }}> Copied! </span>)} </p> </div> <div className="infoItem"> <span>📍</span> <a href="https://www.google.com/maps/search/?api=1&query=Chennai,India" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }} > <p> Chennai, India </p> </a> </div> </div> </div>

        {/* RIGHT SIDE (UPDATED) */}
        <div className="contactCard">

          <h2>Send Message</h2>

          {/* NAME */}
          <div className="inputGroup">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => {
                const value = e.target.value;

                // only letters + space
                if (!/^[a-zA-Z\s]*$/.test(value)) return;

                setForm({ ...form, name: value });
              }}
            />
          </div>

          {/* EMAIL */}
          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* MESSAGE */}
          <div className="inputGroup">
            <label>Message</label>
            <textarea
              rows={6}
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {/* ERROR */}
          {error && <p className="errorText">{error}</p>}

          {/* SUCCESS */}
          {success && <p className="successText">{success}</p>}

          {/* BUTTON */}
          <button
            className="sendBtn"
            onClick={send}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupBox">
            <h2>🎉 Message Sent Successfully!</h2>
            <p>We will contact you soon ❤️</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}