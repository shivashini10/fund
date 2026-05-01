"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FundLoomLogo from "../components/FundLoomLogo";
import "../styles/global.css";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
      <div className="animate-bounce scale-105">
        <FundLoomLogo />
      </div>
    </main>
  );
}