"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem("user"); // ✅ FIX
    setIsLoggedIn(!!user);
  }, []);

  if (!mounted) return null;
  if (!isLoggedIn) return null;

  return (
    <nav className="navbar">
      <Link href="/home" className="navItem">Home</Link>
      <Link href="/create" className="navItem">Details</Link>
      <Link href="/create/details" className="navItem">Campaigns</Link>
      <Link href="/create/preview" className="navItem">Preview</Link>
    </nav>
  );
}