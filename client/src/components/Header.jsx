import { Link } from "react-router";
import blogIcon from "./../../public/edit-svgrepo-com.svg";
import blogIconDark from "./../../public/edit-svgrepo-com_dark.svg";
import ThemeSwitch from "./ThemeSwitch";
import { useState } from "react";

export default function Header() {
  const [currentTheme, setCurrentTheme] = useState("light");

  const handleThemeSwap = (e) => {
    setCurrentTheme(() => {
      return e.target.checked ? "dark" : "light";
    });
  };

  return (
    <div className="flex justify-between items-center py-3 w-full">
      <Link to="/">
        <div className="flex gap-1 items-center">
          <img
            src={currentTheme === "dark" ? blogIconDark : blogIcon}
            alt="icon-blog"
            className="w-8"
          />
          <h1 className="text-xs md:text-base ">
            Amine&apos;s Co
            <samp className="font-bold italic">de Chronicles</samp>
          </h1>
        </div>
      </Link>

      <div className="hidden md:flex gap-5 items-center ">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/search">Search</Link>
      </div>

      <div className="flex gap-2 items-center">
        <ThemeSwitch handleThemeSwap={handleThemeSwap} />
        <Link to="/sign-in">
          <button className="btn btn-sm px-5 text-xs md:text-base">
            Log in
          </button>
        </Link>
        <Link to="/sign-up">
          <button className="btn btn-sm px-5 btn-primary text-xs md:text-base">
            Sign up
          </button>
        </Link>

        <div className="drawer-content flex md:hidden">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
