import AnalyticsChart from "../components/AnalyticsChart";

function Reports() {

  return (
    <div className="container mt-4">

      <h2>
        Reports
      </h2>

      <AnalyticsChart
        labels={[
          "Exam",
          "Placement",
          "Event",
          "Academic"
        ]}
        values={[
          25,
          12,
          18,
          40
        ]}
      />

    </div>
  );
}

export default Reports;