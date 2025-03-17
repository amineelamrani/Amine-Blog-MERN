import { Link } from "react-router";
import HighlightSection from "../../components/adminDashComponents/HighlightSection";
import GraphSection from "../../components/adminDashComponents/GraphSection";
import { useState } from "react";

export default function AdminDashboard() {
  const [period, setPeriod] = useState(7); // For the period for the highlights and evolution graphs

  return (
    <div className="w-full h-full z-10 bg-base-100 py-5 border-t-2">
      {/* <div
        id="side-panel"
        className="hidden md:fixed md:w-1/6 w-32 h-full z-0 border-r border-black px-3 pt-5"
      >
        <ul className="menu rounded-box w-full">
          <li>
            <Link>Dashboard</Link>
          </li>
          <li>
            <Link>Articles</Link>
          </li>
          <li>
            <Link>Users</Link>
          </li>
          <li>
            <Link>Comments</Link>
          </li>
        </ul>
      </div> */}

      <div
        id="dashboard-content"
        className="h-full w-full p-5 flex flex-col gap-2"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Main Dashboard</h1>
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} className="flex items-center" role="button">
              Sort by {period === 7 ? "Week" : "Month"}
              <span className="text-2xl">&#11176;</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow gap-2"
            >
              <li className="btn btn-xs" onClick={() => setPeriod(7)}>
                Weekly
              </li>
              <li className="btn btn-xs" onClick={() => setPeriod(30)}>
                Monthly
              </li>
            </ul>
          </div>
        </div>

        <HighlightSection period={period} />

        <GraphSection period={period} />
      </div>
    </div>
  );
}
