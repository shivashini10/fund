"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./home.css";
import Navbar from "../../components/Navbar";
import "../../styles/global.css";

export default function Home() {
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  const user = localStorage.getItem("user");

  if (!user) {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 2000);

    return () => clearTimeout(timer);
  } else {
    setShowLogin(false);
  }
}, []);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ UPDATED LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill the details");
      return;
    }

    if (!isEmailValid) {
      setError("Invalid email format");
      return;
    }

    try {
      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }
);
console.log("API:", process.env.NEXT_PUBLIC_API_URL);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      setError("");
      setShowLogin(false);

      // ✅ Redirect
      router.push("/home");

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    }
  };

  const handleStart = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setShowLogin(true);
    } else {
      router.push("/create");
    }
  };

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("user");

  return (
    <div className="appContainer">
      <div className="main">

        {!showLogin && <Navbar />}

        <div className="welcome">
          <h1>Welcome to FundLoom</h1>
        </div>

        <div className="hero">
          <Image src="/donate.jpg" alt="donation" width={220} height={220} />

          <h2>Start fundraising in minutes</h2>
          <p>
            Create a campaign and receive contributions from people across the world.
          </p>

          <button
            className="cta"
            onClick={handleStart}
            style={{
              opacity: isLoggedIn ? 1 : 0.7,
              cursor: isLoggedIn ? "pointer" : "not-allowed",
            }}
          >
            Start a Fundraiser
          </button>
        </div>

        <div className="features">
          <div className="card">⚡ Quick Setup</div>
          <div className="card">🌍 Global Reach</div>
          <div className="card">🔒 Secure</div>
        </div>

        <div className="help">
          <div>
            <b>
              <p className="helpText">Need help setting up?</p>
            </b>
            <small>Our team will guide you</small>
          </div>

          <a href="https://wa.me/919876543210" target="_blank">
            <button className="callBtn">Request</button>
          </a>
        </div>

        {showLogin && (
          <div style={styles.overlay}>
            <div style={styles.backdrop}></div>

            <div style={styles.popup}>
              <h2 style={styles.title}>Welcome</h2>
              <p style={styles.subtitle}>Login to continue FundLoom</p>

              {/* EMAIL */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value && !emailRegex.test(value)) {
                      setError("Invalid email format");
                    } else {
                      setError("");
                    }
                  }}
                  style={styles.input}
                />
              </div>

              {/* PASSWORD */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>

                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eye}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              {error && <p style={styles.error}>{error}</p>}

              <button
                onClick={handleLogin}
                style={{
                  ...styles.button,
                  opacity: isEmailValid ? 1 : 0.5,
                  cursor: isEmailValid ? "pointer" : "not-allowed",
                }}
                disabled={!isEmailValid}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* STYLES */
const styles: any = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
  },
  popup: {
    position: "relative",
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "360px",
    textAlign: "center",
    zIndex: 2,
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#FF8A65",
  },
  subtitle: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "15px",
  },
  inputGroup: {
    textAlign: "left",
    marginBottom: "12px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },
  passwordWrapper: {
    position: "relative",
  },
  eye: {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer",
    color: "#888",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#FF8A65",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
  },
};