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
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import PageTitle from "./components/utils/PageTitle";

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
      <div className="container mx-auto px-10 ">
        {adminRight && (
          <div className={`toast  bg-base-100 z-40 p-2`}>
            <Link to="/article/create">
              <img
                src={theme === "dark" ? createWhite : createBlack}
                alt=""
                className="w-8"
              />
            </Link>
          </div>
        )}

        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title={"Amine's Code Chronicles | Welcome"} />
                <Home />
              </>
            }
          />
          <Route path="/article/read/:articleId" element={<ReadArticle />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AdminRestricted />}>
            <Route path="article">
              <Route
                path="create"
                element={
                  <>
                    <PageTitle
                      title={"Create New Article | Amine's Code Chronicles"}
                    />
                    <CreateArticle />
                  </>
                }
              ></Route>
            </Route>
            <Route
              path="/admin/dashboard"
              element={
                <>
                  <PageTitle title={"DashBoard | Amine's Code Chronicles"} />
                  <AdminDashboard />
                </>
              }
            ></Route>
          </Route>

          <Route
            path="/about"
            element={
              <>
                <PageTitle title={"About Page | Amine's Code Chronicles"} />
                <About />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <PageTitle title={"Search | Amine's Code Chronicles"} />
                <Search />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <PageTitle title={"Sign In | Amine's Code Chronicles"} />
                <SignIn />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <PageTitle title={"Sign Up | Amine's Code Chronicles"} />
                <SignUp />
              </>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <>
                <PageTitle
                  title={"Forgot Password | Amine's Code Chronicles"}
                />
                <ForgotPassword />
              </>
            }
          />
          <Route
            path="/reset-password/:email"
            element={
              <>
                <PageTitle title={"Password Reset | Amine's Code Chronicles"} />
                <ResetPassword />
              </>
            }
          />
          <Route
            path="/account-confirmation/:email"
            element={
              <>
                <PageTitle
                  title={"Account Confirmation | Amine's Code Chronicles"}
                />
                <ConfirmAccount />
              </>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
