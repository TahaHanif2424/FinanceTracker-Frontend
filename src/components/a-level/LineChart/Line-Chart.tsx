import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const data = {
  labels: ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20", "Jan 25", "Jan 30"],
  datasets: [
    {
      label: "Expenses",
      data: [320, 450, 380, 520, 410, 600, 480],
      borderColor: "#0F4C5C",
      backgroundColor: "rgba(15, 76, 92, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: "#0F4C5C",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointHoverBackgroundColor: "#0F4C5C",
      pointHoverBorderColor: "#fff",
      pointHoverBorderWidth: 3,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#0F4C5C",
      bodyColor: "#5E8C61",
      borderColor: "#E5E5E5",
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function (context: any) {
          return `Expenses: $${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(229, 229, 229, 0.5)",
        drawBorder: false,
      },
      ticks: {
        color: "#0F4C5C",
        font: {
          size: 12,
        },
      },
      border: {
        color: "#0F4C5C",
      },
    },
    y: {
      grid: {
        display: true,
        color: "rgba(229, 229, 229, 0.5)",
        drawBorder: false,
      },
      ticks: {
        color: "#0F4C5C",
        font: {
          size: 12,
        },
        callback: function (value: any) {
          return "$" + value;
        },
      },
      border: {
        color: "#0F4C5C",
      },
    },
  },
};

export default function ExpenseLineChart() {
  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
}
