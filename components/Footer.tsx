import "./Footer.css";
import { HandHeart } from "lucide-react";
import { useState } from "react";

export default function Footer() {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+91 9876543210");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <footer className="footer">

      {/* LEFT LOGO */}
      <div className="footerLogo">

        {/* 🔥 ICON + TEXT WRAPPED TOGETHER */}
        <div className="logoRow">
          <HandHeart size={28} color="#ffffff" />
          <span>FundLoom</span>
        </div>

        <p>
          Empowering people to raise funds for medical, education, emergency,
          and social causes. Together, we can build a better tomorrow.
        </p>

      </div>

      {/* SUPPORT */}
      <div className="footerSupport">
        <h3>Support</h3>
        <p>How it Works</p>
        <p>FAQs</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
      </div>

      {/* CONTACT */}
      <div className="footerContact">
        <h3>Contact</h3>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
            <path d="M168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h624q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H168Zm312-240L168-611v347h624v-347L480-432Zm0-85 312-179H168l312 179Zm-312-94v-85 432-347Z" />
          </svg>

          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@fundloom.com" target="_blank">
            support@fundloom.com
          </a>
        </p>
        <p onClick={handleCopy} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
            <path d="M763-145q-121-9-229.5-59.5T339-341q-86-86-135.5-194T144-764q-2-21 12.29-36.5Q170.57-816 192-816h136q17 0 29.5 10.5T374-779l24 106q2 13-1.5 25T385-628l-97 98q20 38 46 73t57.97 65.98Q422-361 456-335.5q34 25.5 72 45.5l99-96q8-8 20-11.5t25-1.5l107 23q17 5 27 17.5t10 29.5v136q0 21.43-16 35.71Q784-143 763-145ZM255-600l70-70-17.16-74H218q5 38 14 73.5t23 70.5Zm344 344q35.1 14.24 71.55 22.62Q707-225 744-220v-90l-75-16-70 70ZM255-600Zm344 344Z" />
          </svg>

          +91 9876543210

          {copied && (
            <span style={{ backgroundColor: "black", color: "white", marginLeft: "10px", padding: "3px", fontSize: "12px", borderRadius: "5px" }}>
              Copied!
            </span>
          )}
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Chennai,India"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
        >
          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
              <path d="M531-501q21-21 21-51t-21-51q-21-21-51-21t-51 21q-21 21-21 51t21 51q21 21 51 21t51-21Zm-51 310q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z" />
            </svg>

            Chennai, India
          </p>
        </a>


        <div className="socialMedia">

          {/* Facebook */}
          <div className="socialIcon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="socialIcon"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

          </div>

          {/* Twitter */}
          <div className="socialIcon">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="socialIcon"
            >
              {/* Twitter */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 16.11 3c-2.63 0-4.6 2.46-4 5A12.94 12.94 0 0 1 3 4s-4 9 5 13a13.28 13.28 0 0 1-8 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
          </div>

          {/* Instagram */}
          <div className="socialIcon">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="socialIcon"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.5" />
              </svg>
            </a>
          </div>

          {/* LinkedIn */}
          <div className="socialIcon">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="socialIcon"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.9-2.2 4.2 0 5 2.7 5 6.3V24h-4v-7.3c0-1.7 0-3.9-2.4-3.9s-2.8 1.8-2.8 3.8V24h-4V8z" />
              </svg>
            </a>
          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footerBottom">
        <p>© {new Date().getFullYear()} FundLoom. All rights reserved.</p>
      </div>

    </footer>
  );
}