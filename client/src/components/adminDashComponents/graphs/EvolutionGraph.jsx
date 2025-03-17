import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export default function UserEvolutionGraph({ dataFetched, textDisplay }) {
  const labels = dataFetched.rows.map((el) => el.slice(5, 10));
  const data = {
    labels: labels,
    datasets: [
      {
        label: textDisplay,
        backgroundColor: textDisplay.startsWith("User")
          ? "red"
          : textDisplay.startsWith("Article")
          ? "green"
          : "blue",
        borderColor: textDisplay.startsWith("User")
          ? "red"
          : textDisplay.startsWith("Article")
          ? "green"
          : "blue",
        data: dataFetched.columns,
      },
    ],
  };

  return (
    <div className="w-full md:w-1/3 h-1/3 p-1">
      <div className="text-center w-full h-full border">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
