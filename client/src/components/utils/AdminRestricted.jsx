import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
// I need to protect the create article route better than this (because all the authen people can enter to it)

export default function AdminRestricted() {
  const [adminRight, setAdminRight] = useState(null);
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
  }, []);

  let dest = <></>;
  if (adminRight !== null) {
    if (adminRight) {
      dest = <Outlet />;
    } else {
      dest = <Navigate to="/sign-in" />;
    }
  }
  return <>{dest}</>;
}
