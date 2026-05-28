import DashboardCards from "../../../components/DashboardCards";

export default function AdminDashboard() {

  return (

    <div className="dashboardGrid">

      <DashboardCards
        title="Total Donations"
        value="₹5L"
      />

      <DashboardCards
        title="Active Campaigns"
        value="120"
      />

      <DashboardCards
        title="Users"
        value="3,200"
      />

    </div>

  );
}