import { useEffect, useState } from "react";
import EvolutionGraph from "./graphs/EvolutionGraph";
import DistributionArticles from "./graphs/DistributionArticles";
import UsersLeaderboard from "./graphs/UsersLeaderboard";
import CommentsLeaderboard from "./graphs/CommentsLeaderboard";
import ArticlesLeaderboard from "./graphs/ArticlesLeaderboard";

export default function GraphSection({ period }) {
  const [evolutionData, setEvolutionData] = useState(null);

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const res = await fetch(
          `/api/v1/users/admin/graphs/evolution/${period}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data && data.status === "success") {
          setEvolutionData(data.data);
        } else {
          setEvolutionData(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvolution();
  }, [period]);

  return (
    <div id="graphs-section" className="flex flex-wrap w-full h-full">
      <EvolutionGraph
        dataFetched={!evolutionData ? null : evolutionData.users}
        evolutionData={evolutionData}
        textDisplay={`Users per ${period === 7 ? "Week" : "Month"}`}
      />
      <EvolutionGraph
        dataFetched={!evolutionData ? null : evolutionData.articles}
        evolutionData={evolutionData}
        textDisplay={`Articles per ${period === 7 ? "Week" : "Month"}`}
      />
      <EvolutionGraph
        dataFetched={!evolutionData ? null : evolutionData.comments}
        evolutionData={evolutionData}
        textDisplay={`Comments per ${period === 7 ? "Week" : "Month"}`}
      />

      <DistributionArticles />
      <CommentsLeaderboard />
      <UsersLeaderboard />
      <ArticlesLeaderboard />
    </div>
  );
}
