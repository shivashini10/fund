import "./DashboardCards.css";

export default function DashboardCards({ title, value }: any) {

  return (

    <div className="dashboardCard">

      <div className="cardTop">

        <h4>{title}</h4>

        <div className="cardIcon">
          📊
        </div>

      </div>

      <h2>{value}</h2>

      <p className="growthText">
        +12% from last month
      </p>

    </div>

  );
}