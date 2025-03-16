import { useEffect, useState } from "react";
import EvolutionGraph from "./graphs/EvolutionGraph";
import DistributionArticles from "./graphs/DistributionArticles";
import UsersLeaderboard from "./graphs/UsersLeaderboard";

export default function GraphSection() {
  const [evolutionData, setEvolutionData] = useState(null);

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const res = await fetch(`/api/v1/users/admin/graphs/evolution/7`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
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
  }, []);

  return (
    <div id="graphs-section" className="flex flex-wrap w-full h-full">
      {evolutionData && (
        <>
          <EvolutionGraph
            dataFetched={evolutionData.users}
            textDisplay="Users per Week"
          />
          <EvolutionGraph
            dataFetched={evolutionData.articles}
            textDisplay="Articles per Week"
          />
          <EvolutionGraph
            dataFetched={evolutionData.comments}
            textDisplay="Comments per Week"
          />
        </>
      )}
      <DistributionArticles />

      <div className="w-1/2 h-1/3 text-center border">Comments Leaderboard</div>

      <UsersLeaderboard />
      <div className="w-2/3 h-1/3 text-center border">Articles leaderboard</div>
    </div>
  );
}
