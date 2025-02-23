import { Link } from "react-router";

export default function SideDrawer() {
  return (
    <div className="drawer md:hidden drawer-end z-30 overflow-hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content w-1/2">
          {/* <div className="flex flex-col gap-5 items-center "> */}
          <h1 className="text-center text-primary">
            Amine&apos;s Co
            <samp className="font-bold italic">de Chronicles</samp>
          </h1>
          <li className="">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>

          {/* </div> */}
        </ul>
      </div>
    </div>
  );
}
