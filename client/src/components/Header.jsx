import { Link } from "react-router";
import blogIcon from "/edit-svgrepo-com.svg";
import blogIconDark from "/edit-svgrepo-com_dark.svg";
import ThemeSwitch from "./ThemeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { storeTheme } from "../redux/user/userSlice";

export default function Header() {
  const { currentUser, theme } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleThemeSwap = (e) => {
    const themeChecked = e.target.checked ? "dark" : "light";
    dispatch(storeTheme(themeChecked));
  };

  return (
    <div className="flex justify-between items-center py-3 w-full">
      <Link to="/">
        <div className="flex gap-1 items-center">
          <img
            src={theme === "dark" ? blogIconDark : blogIcon}
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
        {currentUser === null && (
          <>
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
          </>
        )}
        {currentUser !== null && (
          <div className="avatar online ">
            <div className="w-6  bg-white ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
              <Link to="/profile">
                <img src={currentUser.profilePicture} />
              </Link>
            </div>
          </div>
        )}

        <div className="dropdown dropdown-bottom dropdown-end md:hidden">
          <div tabIndex={0}>
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
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-5 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
