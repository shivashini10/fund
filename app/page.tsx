"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FundLoomLogo from "../components/FundLoomLogo";
import "../components/FundLoomLogo.css";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="splash-container">

      {/* Animated Logo */}
      <div className="logo-wrapper">
        <FundLoomLogo />
      </div>

      {/* Loader */}
      <div className="loader"></div>

    </main>
  );
}