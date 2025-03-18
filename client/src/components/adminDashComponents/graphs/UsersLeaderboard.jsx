import { useEffect, useState } from "react";
import TableRowUsers from "./TableRowUsers";
import loader from "/loading-spinner-svgrepo-com.svg";

export default function UsersLeaderboard() {
  const [fetchedData, setFetchedData] = useState(null);
  const [sort, setSort] = useState("active");

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await fetch(
          `/api/v1/users/admin/graphs/leaderboard/users/${sort}`,
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
    <div className="w-full lg:w-1/3 h-72 p-1">
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
                onClick={() => setSort("active")}
              >
                Active
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
                <th></th>
                <th>User</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData && (
                <>
                  {fetchedData.map((el, index) => (
                    <TableRowUsers
                      image={el.profilePicture}
                      name={el.name}
                      email={el.email}
                      interactions={el.activity}
                      id={el._id}
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
