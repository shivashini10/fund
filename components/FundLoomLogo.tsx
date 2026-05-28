import "./FundLoomLogo.css";

export default function FundLoomLogo() {
  return (
    <div className="logoWrapper">

      {/* LOGO */}
      <svg
        className="logoIcon"
        viewBox="0 0 200 200"
        fill="none"
      >

        {/* HEART */}
        <path
          d="M100 170 
             C20 120, 20 40, 100 70 
             C180 40, 180 120, 100 170Z"
          className="heart"
        />

        {/* THREADS */}
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

      {/* BRAND */}
      <h1 className="logoText">
        <span className="fund">Fund</span>
        <span className="loom">Loom</span>
      </h1>

      {/* TAGLINE */}
      <p className="tagline">
        Weaving Hope Together
      </p>

    </div>
  );
}