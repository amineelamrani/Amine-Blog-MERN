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
import loader from "/loading-spinner-svgrepo-com.svg";

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

export default function UserEvolutionGraph({
  dataFetched,
  textDisplay,
  evolutionData,
}) {
  const labels =
    evolutionData !== null ? dataFetched.rows.map((el) => el.slice(5, 10)) : [];
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
        data: evolutionData !== null ? dataFetched.columns : [],
      },
    ],
  };

  return (
    <div className="w-full lg:w-1/3 h-72 p-1 flex items-center justify-center">
      {!evolutionData && (
        <div className="w-full h-full border flex items-center justify-center">
          <img src={loader} alt="spinner" className="animate-spin w-10" />
        </div>
      )}
      {evolutionData && (
        <div className="text-center w-full h-full border flex items-center justify-center">
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
}
