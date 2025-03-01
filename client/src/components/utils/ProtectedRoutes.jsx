import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
// I need to protect the create article route better than this (because all the authen people can enter to it)

export default function ProtectedRoutes() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
