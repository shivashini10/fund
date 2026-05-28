import "./Charts.css";

export default function Charts() {

  return (

    <div className="chartsContainer">

      {/* HEADER */}
      <div className="chartsHeader">

        <div>
          <h2>Campaign Analytics</h2>

          <p>
            Track donations, supporters, and campaign growth
          </p>
        </div>

        <button className="downloadBtn">
          Download Report
        </button>

      </div>

      {/* CARDS */}
      <div className="analyticsGrid">

        <div className="analyticsCard">

          <h3>Total Raised</h3>

          <h1>₹2.5L</h1>

          <span>+18% this month</span>

        </div>

        <div className="analyticsCard">

          <h3>Total Donors</h3>

          <h1>1,240</h1>

          <span>+12% this week</span>

        </div>

        <div className="analyticsCard">

          <h3>Active Campaigns</h3>

          <h1>42</h1>

          <span>8 campaigns trending</span>

        </div>

      </div>

      {/* CHART PLACEHOLDER */}
      <div className="chartBox">

        <div className="chartTop">

          <h3>Donation Overview</h3>

          <select>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Year</option>
          </select>

        </div>

        {/* FAKE CHART */}
        <div className="fakeChart">

          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
          <div className="bar bar4"></div>
          <div className="bar bar5"></div>
          <div className="bar bar6"></div>

        </div>

      </div>

    </div>

  );
}