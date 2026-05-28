"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px 20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
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
          My Profile
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "#777",
                marginBottom: "5px",
              }}
            >
              Email
            </p>

            <div
              style={{
                background: "#f3f4f6",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "500",
              }}
            >
              {user?.email || "No email found"}
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: "13px",
                color: "#777",
                marginBottom: "5px",
              }}
            >
              Username
            </p>

            <div
              style={{
                background: "#f3f4f6",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "500",
              }}
            >
              {user?.name || "Guest User"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}