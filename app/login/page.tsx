"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import "../../styles/global.css";
import "./login.css";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // EMAIL VALIDATION
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // PASSWORD VALIDATION
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async () => {
    if (
      !form.email ||
      !form.password ||
      (!isLogin && !form.name)
    ) {
      setError("Please fill all fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!isValidPassword(form.password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // ✅ SAVE USER
      const userData = {
        name: form.name || form.email.split("@")[0],
        email: form.email,
      };

      localStorage.setItem(
        "fundloom_user",
        JSON.stringify(userData)
      );

      // ✅ NO ALERT - just redirect
      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <Navbar />

      <div className="authContainer">
        {/* LEFT */}
        <div className="authLeft">
          <h1>Welcome to FundLoom ❤️</h1>
          <p>
            Raise funds, support causes, and make a real difference.
          </p>

          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200"
            alt="fundraising"
          />
        </div>

        {/* RIGHT */}
        <div className="authCard">
          <div className="authHeader">
            <button
              className={isLogin ? "activeTab" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "activeTab" : ""}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <h2>
            {isLogin ? "Login to Account" : "Create Account"}
          </h2>

          {/* NAME */}
          {!isLogin && (
            <div className="inputGroup">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!/^[a-zA-Z\s]*$/.test(value)) return;

                  setForm({ ...form, name: value });
                }}
              />
            </div>
          )}

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

          {/* PASSWORD */}
          <div className="inputGroup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* ERROR */}
          {error && <p className="errorText">{error}</p>}

          {/* BUTTON */}
          <button
            className="submitBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>

          {/* SWITCH */}
          <p className="bottomText">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}