import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signOut } from "../redux/user/userSlice";

// in the profile route => I will have
// [signOut - delete account - Update name - update profile picture (delete the existing one) - Update Password - possibility to go to admin dashboard if admin on it ]

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
