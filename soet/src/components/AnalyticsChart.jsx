import {
  Pie
} from "react-chartjs-2";

import {
  Chart,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(
  ArcElement,
  Tooltip,
  Legend
);

function AnalyticsChart() {

  const data = {

    labels: [
      "Exam",
      "Placement",
      "Event",
      "Academic"
    ],

    datasets: [
      {
        data: [
          20,
          15,
          30,
          35
        ]
      }
    ]
  };

  return (

    <div
      style={{
        width: "400px"
      }}
    >

      <Pie data={data} />

    </div>

  );
}

export default AnalyticsChart;