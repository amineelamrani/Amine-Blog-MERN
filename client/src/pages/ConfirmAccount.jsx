import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import WarningComponent from "../components/WarningComponent";
import {
  signInDone,
  signInFailed,
  startAuth,
  startTyping,
} from "../redux/user/userSlice";

export default function ConfirmAccount() {
  const [inputData, setInputData] = useState("");
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  let params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const email = params.email;

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      dispatch(startAuth());
      e.preventDefault();
      try {
        const dataReceived = await fetchData(email, inputData);
        if (dataReceived && dataReceived.status === "success") {
          const data = {
            email: dataReceived.result.email,
            name: dataReceived.result.name,
            profilePicture: dataReceived.result.profilePicture,
          };
          dispatch(signInDone(data));
          navigate("/");
        } else if (dataReceived.status === "fail") {
          dispatch(signInFailed("Cannot confirm your account!"));
        }
      } catch (err) {
        dispatch(
          signInFailed("Unexpected Error happened, Please Sign In again")
        );
      }
    }
  };

  const fetchData = async (mail, uniqueString) => {
    const response = await fetch(
      `/api/v1/users/verify?uniqueString=${uniqueString}&mail=${mail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  };

  return (
    <div className="flex flex-col my-5 items-center min-w-96 mx-auto w-fit p-10">
      <div className="w-80 pb-5">
        {error.error && <WarningComponent text={error.message} />}
      </div>
      <h1 className="text-3xl">Confirm Account</h1>
      <p className="pt-5 pb-10 text-center">
        Please enter below the unique code sent to you via email <br /> in order
        to confirm your account!
      </p>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">
            Paste the code sent to you via mail
          </span>
        </div>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={inputData}
            onChange={(e) => {
              dispatch(startTyping());
              setInputData(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>

        <div className="label">
          <span className="label-text-alt">
            Check spam folder if you don&apos;t find it in your inbox!
          </span>
        </div>
      </label>
    </div>
  );
}
