import { useState, useEffect } from "react";
import TableRowComments from "./TableRowComments";
import loader from "/loading-spinner-svgrepo-com.svg";

export default function CommentsLeaderboard() {
  const [fetchedData, setFetchedData] = useState(null);
  const [sort, setSort] = useState("trending");

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await fetch(
          `/api/v1/users/admin/graphs/leaderboard/comments/${sort}`,
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
        console.log(err);
      }
    };

    fetchDistribution();
  }, [sort]);

  return (
    <div className="w-full lg:w-1/2 h-72 p-1">
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
                <th>Owner</th>
                <th>Image</th>
                <th>Content</th>
                <th>Likes</th>
              </tr>
            </thead>

            <tbody>
              {fetchedData && (
                <>
                  {fetchedData.map((el, index) => (
                    <TableRowComments
                      ind={index + 1}
                      name={el.ownerName}
                      image={
                        el.owner
                          ? el.owner.profilePicture
                          : "https://img.icons8.com/?size=100&id=Ib9FADThtmSf&format=png&color=000000"
                      }
                      content={el.content}
                      id={el._id}
                      likes={el.likedBy.length}
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
