import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

function AdminDashboard() {

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">

        <Sidebar />

        <div className="dashboard-content">

          <h2>
            Analytics Dashboard
          </h2>

          <div className="row">

            <div className="col-md-4">
              <AnalyticsCard
                title="Students"
                value="350"
              />
            </div>

            <div className="col-md-4">
              <AnalyticsCard
                title="Faculty"
                value="40"
              />
            </div>

            <div className="col-md-4">
              <AnalyticsCard
                title="Notices"
                value="120"
              />
            </div>

          </div>

          <br />

          <AnalyticsChart />

        </div>

      </div>

    </>
  );
}

export default AdminDashboard;