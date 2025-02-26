import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { signInDone, startAuth, startTyping } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

export default function OAuth() {
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [googleResult, setGoogleResult] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const fetchData = async (dataToFetch) => {
      const response = await fetch("/api/v1/users/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: dataToFetch.email,
          name: dataToFetch.name,
          profilePicture: dataToFetch.profilePicture,
        }),
      });
      const data = await response.json();
      if (data && data.status === "success") {
        const dataState = {
          email: data.result.email,
          name: data.result.name,
          profilePicture: data.result.profilePicture,
        };
        dispatch(signInDone(dataState));
        navigate("/");
      }
    };

    if (googleResult) {
      fetchData({
        email: googleResult.email,
        name: googleResult.displayName,
        profilePicture: googleResult.photoURL,
      });
    }
  }, [googleResult]);

  const provider = new GoogleAuthProvider();

  const handleClick = async () => {
    dispatch(startAuth());
    signInWithPopup(auth, provider).then((result) => {
      setGoogleResult(result.user);
      // Got the results
      // and send them to server side
      // Log in the user as in signin or signup
    });
  };

  return (
    <div className="w-full mb-2">
      <button
        className="btn btn-neutral w-full"
        onClick={handleClick}
        disabled={isLoading ? true : false}
      >
        OAuth
      </button>
    </div>
  );
}
