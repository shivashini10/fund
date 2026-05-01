import "./FundLoomLogo.css";
import "../styles/global.css";

export default function FundLoomLogo() {
  return (
    <div className="logoWrapper">

      {/* ICON */}
      <svg
        className="logoIcon"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M100 170 C20 120, 20 40, 100 70 C180 40, 180 120, 100 170Z"
          className="heart"
        />
        <path
          d="M60 120 C80 60, 120 60, 140 120"
          className="thread1"
        />
        <path
          d="M70 140 C90 90, 110 90, 130 140"
          className="thread2"
        />
        <path
          d="M80 155 C95 120, 105 120, 120 155"
          className="thread3"
        />
      </svg>

      {/* TEXT */}
      <h1 className="logoText">
        <span className="fund">Fund</span>
        <span className="loom">Loom</span>
      </h1>

      <p className="tagline">Weaving Hope Together</p>

    </div>
  );
}