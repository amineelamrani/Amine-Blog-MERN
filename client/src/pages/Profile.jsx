import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  changeProfilePicture,
  changeProfilePictureFail,
  signInFailed,
  signOut,
  StartChangeProfilePicture,
} from "../redux/user/userSlice";
import ConfirmButtonCheck from "../components/svgComponents/ConfirmButtonCheck";
import { useState } from "react";
import ActionConfirmation from "../components/ActionConfirmation";

// in the profile route => I will have
// [signOut - delete account - Update name - update profile picture (delete the existing one) - Update Password - possibility to go to admin dashboard if admin on it ]

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, theme, isLoading, error } = useSelector(
    (state) => state.user
  );
  const [file, setFile] = useState(null);
  let navigate = useNavigate();

  const cloudName = import.meta.env.VITE_CLOUDINARY_cloudName;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_uploadPreset;

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

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchChangeProfilePicture = async (url) => {
    const res = await fetch("/api/v1/users/changePicture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (data && data.status === "success") {
      dispatch(changeProfilePicture(url));
    } else {
      dispatch(changeProfilePictureFail());
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("need a file");
      return;
    }
    dispatch(StartChangeProfilePicture());
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "blog/ProfilePictures");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      await fetchChangeProfilePicture(data.url);
      // dispatch(changeProfilePicture(data.url));
      // send request to the server to update the profile picture
      // change the state
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("/api/v1/users/delete", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        // current user to initial state
        dispatch(signOut());
      }
    } catch (err) {
      console.log("oops there was an error :", err);
      dispatch(signInFailed("Cannot delete the account! an eror happened"));
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-14 gap-3">
      {error.error && (
        <div className="toast z-50">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error.message} </span>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-warning">
            <span className="loading loading-spinner loading-xs"></span>
            <span>Uploading picture to the server</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl">Welcome {currentUser.name}</h1>
      <h1 className="text-4xl font-bold">Profile Page</h1>
      <div
        id="ProfilePicture-Section"
        className="flex flex-col items-center gap-3"
      >
        <h1>Update your Profile Picture</h1>
        <img
          src={currentUser.profilePicture}
          alt="profile picture"
          className=" w-32 h-32 rounded-full bg-white border-2 p-2"
        />
        <div className="flex gap-4 items-center">
          <input
            type="file"
            className="file-input file-input-bordered file-input-xs w-full max-w-xs"
            onChange={handleChangeFile}
          />
          <ConfirmButtonCheck
            onClick={handleUpload}
            colorHex={theme === "light" ? "000000" : "ffffff"}
          />
        </div>
      </div>

      <div
        id="delete-signOut-seeCommentsUser-dashboardAdmin"
        className="flex gap-10 py-5"
      >
        <ActionConfirmation
          action="sign Out"
          handleClick={async () => {
            await signOutAPI();
          }}
        />

        <ActionConfirmation
          action="Delete Account"
          handleClick={handleDeleteAccount}
        />
      </div>
      <button className="btn">
        {" "}
        <span className="text-xl font-black animate-bounce">&#11107;</span> See
        comments
      </button>
    </div>
  );
}
