import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import Footer from "./components/Footer";
import ConfirmAccount from "./pages/ConfirmAccount";
import ResetPassword from "./pages/ResetPassword";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";

export default function App() {
  const { theme } = useSelector((state) => state.user);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <BrowserRouter>
      <SideDrawer />
      <div className="container mx-auto px-10">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
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
