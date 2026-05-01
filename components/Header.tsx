"use client";

import { useRouter } from "next/navigation";
import "./Header.css";

type Props = {
  title?: string;
};

export default function Header({ title }: Props) {
  const router = useRouter();

  return (
    <div className="header">

      {/* Back Button */}
      <span onClick={() => router.back()} className="back">
        ← Back
      </span>

      {/* Optional Title */}
      {title && <h2 className="title">{title}</h2>}

    </div>
  );
}