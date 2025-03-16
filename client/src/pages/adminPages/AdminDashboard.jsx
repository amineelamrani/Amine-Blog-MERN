import { Link } from "react-router";
import HighlightSection from "../../components/adminDashComponents/HighlightSection";
import GraphSection from "../../components/adminDashComponents/GraphSection";

export default function AdminDashboard() {
  return (
    <div className="absolute right-0 left-0 w-full h-dvh overscroll-none z-10 bg-base-100 flex overflow-hidden border-t-2">
      <div
        id="side-panel"
        className="hidden md:flex md:w-1/6 h-full border-r border-black px-3 pt-5"
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
      </div>

      <div
        id="dashboard-content"
        className="h-full w-full p-5 flex flex-col gap-2"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Main Dashboard</h1>
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button">
              Monthly V
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>Weekly</a>
              </li>
              <li>
                <a>Monthly</a>
              </li>
            </ul>
          </div>
        </div>

        <HighlightSection />

        <GraphSection />
      </div>
    </div>
  );
}
