"use client";

import "./Navbar.css";
import { HandHeart, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleNavigate = (path) => {
    router.push(path);
    setOpen(false);
  };

  const handleProtectedNavigate = (path) => {
  const user = localStorage.getItem("fundloom_user");

  if (!user) {
    router.push("/login");   // 🚨 redirect if not logged in
    return;
  }

  router.push(path); // ✅ allow access
};

  // LOAD USER
  useEffect(() => {
    const savedUser = localStorage.getItem("fundloom_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // LOGOUT
  const handleLogout = () => {
  // Remove user session
  localStorage.removeItem("fundloom_user");

  // Remove campaign-related data
  localStorage.removeItem("campaign");
  localStorage.removeItem("allCampaigns");

  // OPTIONAL: clear everything related to your app safely
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("fundloom_")) {
      localStorage.removeItem(key);
    }
  });

  setUser(null);

  router.push("/login");
};

  const displayName = user?.name || user?.email;

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo" onClick={() => handleNavigate("/home")}>
        <HandHeart size={34} />
        <span>FundLoom</span>
      </div>

      {/* HAMBURGER */}
      <div className="menuIcon" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* NAV LINKS */}
      <div className={`navLinks ${open ? "active" : ""}`}>

        <a onClick={() => handleNavigate("/home")}>Home</a>
        <a onClick={() => handleProtectedNavigate("/create")}>
  Campaign
</a>

<a onClick={() => handleProtectedNavigate("/donate")}>
  Donation
</a>
        <a onClick={() => handleNavigate("/chatbot")}>Chatbot</a>
        <a onClick={() => handleNavigate("/contact")}>Contact</a>

        {/* AUTH SECTION */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

              {/* PROFILE ICON */}
              <button
                className="loginBtn"
                title={user.email}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  padding: "0",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  marginLeft: "100px"
                }}
              >
                👤
              </button>

              {/* NAME / EMAIL */}
              <span style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
                maxWidth: "100px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {displayName}
              </span>

              {/* LOGOUT */}
              <button
                className="loginBtn"
                style={{ background: "#ff7043" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="loginBtn"
              onClick={() => handleNavigate("/login")}
            >
              Login / Sign Up
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}