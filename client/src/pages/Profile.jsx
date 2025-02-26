import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const signOutAPI = async () => {
    const res = await fetch("/api/v1/users/signout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success") {
      dispatch(signOut());
      navigate("/sign-in");
    }
  };
  return (
    <div>
      <button
        onClick={async () => {
          await signOutAPI();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
