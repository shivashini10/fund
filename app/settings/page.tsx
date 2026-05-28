"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // ✅ Load saved settings
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    const savedNotify = localStorage.getItem("notifications");

    if (savedDark) {
      setDarkMode(JSON.parse(savedDark));
    }

    if (savedNotify) {
      setNotifications(JSON.parse(savedNotify));
    }
  }, []);

  // ✅ Save settings
  const handleDarkMode = () => {
    const updated = !darkMode;
    setDarkMode(updated);
    localStorage.setItem("darkMode", JSON.stringify(updated));
  };

  const handleNotifications = () => {
    const updated = !notifications;
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 20px",
        background: darkMode ? "#111827" : "#f5f7fb",
        color: darkMode ? "#fff" : "#000",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: darkMode ? "#1f2937" : "#fff",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#FF8A65",
          }}
        >
          Settings
        </h1>

        {/* Dark Mode */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
            borderBottom: "1px solid #ddd",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Dark Mode</h3>
            <p style={{ margin: "5px 0", fontSize: "13px", color: "#777" }}>
              Enable dark theme
            </p>
          </div>

          <button
            onClick={handleDarkMode}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "10px",
              background: darkMode ? "#22c55e" : "#FF8A65",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {darkMode ? "ON" : "OFF"}
          </button>
        </div>

        {/* Notifications */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Notifications</h3>
            <p style={{ margin: "5px 0", fontSize: "13px", color: "#777" }}>
              Receive campaign updates
            </p>
          </div>

          <button
            onClick={handleNotifications}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "10px",
              background: notifications ? "#22c55e" : "#FF8A65",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {notifications ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}