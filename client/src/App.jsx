import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConfirmAccount from "./pages/ConfirmAccount";
import ResetPassword from "./pages/ResetPassword";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import CreateArticle from "./pages/adminPages/CreateArticle";
import AdminRestricted from "./components/utils/AdminRestricted";
import ReadArticle from "./pages/articlePages/ReadArticle";
import createWhite from "/create-article-white.svg";
import createBlack from "/create-article-black.svg";

export default function App() {
  const { theme, currentUser } = useSelector((state) => state.user);

  const [adminRight, setAdminRight] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/v1/articles/check/checkAdmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data && data.status === "success") {
        setAdminRight(true);
        // return <Outlet />;
      } else {
        setAdminRight(false);
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="container mx-auto px-10">
        {adminRight && (
          <div className="toast">
            <Link to="/article/create">
              <img
                src={theme === "dark" ? createWhite : createBlack}
                alt=""
                className="w-10 bg-inherit"
              />
            </Link>
          </div>
        )}

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/read/:articleId" element={<ReadArticle />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AdminRestricted />}>
            <Route path="article">
              <Route path="create" element={<CreateArticle />}></Route>
            </Route>
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route
            path="/account-confirmation/:email"
            element={<ConfirmAccount />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
