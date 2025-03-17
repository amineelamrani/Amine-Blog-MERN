import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

export default function DistributionArticles({}) {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await fetch(`/api/v1/users/admin/graphs/catDistribution`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();
        if (data && data.status === "success") {
          setFetchedData(data.result);
        } else {
          setFetchedData(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchDistribution();
  }, []);

  const labels = fetchedData !== null ? Object.keys(fetchedData) : [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Article distribution by category",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: fetchedData !== null ? Object.values(fetchedData) : [],
      },
    ],
  };

  return (
    <div className="w-1/2 h-1/3 p-1">
      {fetchedData && (
        <div className="w-full h-full text-center border">
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
}
