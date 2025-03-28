import { useState, useEffect } from "react";
import TableRowArticles from "./TableRowArticles";
import loader from "/loading-spinner-svgrepo-com.svg";

export default function ArticlesLeaderboard() {
  const [fetchedData, setFetchedData] = useState(null);
  const [sort, setSort] = useState("trending");

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await fetch(
          `/api/v1/users/admin/graphs/leaderboard/articles/${sort}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data && data.status === "success") {
          setFetchedData(data.result);
        } else {
          setFetchedData(null);
        }
      } catch (err) {
        // console.log(err);
        return;
      }
    };

    fetchDistribution();
  }, [sort]);

  return (
    <div className="w-full lg:w-2/3 h-72 p-1">
      {!fetchedData && (
        <div className="w-full h-full border flex items-center justify-center">
          <img src={loader} alt="spinner" className="animate-spin w-10" />
        </div>
      )}
      {fetchedData && (
        <div className="h-full overflow-x-auto text-center border p-2">
          <details className="dropdown dropdown-bottom dropdown-end w-full text-end">
            <summary className="hover:cursor-pointer">Sort by</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-20 w-fit gap-2 px-2 shadow">
              <li
                className="btn btn-xs btn-ghost"
                onClick={() => setSort("trending")}
              >
                Trending
              </li>
              <li
                className="btn btn-xs btn-ghost"
                onClick={() => setSort("latest")}
              >
                Latest
              </li>
              <li
                className="btn btn-xs btn-ghost"
                onClick={() => setSort("oldest")}
              >
                Oldest
              </li>
            </ul>
          </details>
          <table className="table table-xs table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th>ind</th>
                <th>Title</th>
                <th>Image</th>
                <th>summary</th>
                <th>Likes</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData && (
                <>
                  {fetchedData.map((el, index) => (
                    <TableRowArticles
                      ind={index + 1}
                      title={el.title}
                      image={el.image}
                      summary={el.summary}
                      id={el._id}
                      likes={el.timesLiked}
                      key={index}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
