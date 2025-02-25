import { Link, useNavigate } from "react-router";
import OAuth from "../components/OAuth";
import { useState } from "react";
import WarningComponent from "../components/WarningComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  createAccountSuccess,
  signInDone,
  signInFailed,
  startAuth,
  startTyping,
} from "../redux/user/userSlice";

export default function ForgotPassword() {
  // Managing States
  const [inputData, setInputData] = useState("");
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataReceived = await fetchData({ email: inputData });
      dispatch(startAuth());
      if (dataReceived && dataReceived.status === "success") {
        // if success redirect to resetPassword route (with mail in the params ) // reset token from mail and password add them
        dispatch(createAccountSuccess());
        navigate(`/reset-password/${inputData}`);
      } else if (dataReceived.status === "fail") {
        dispatch(signInFailed(dataReceived.message));
      }
    } catch (err) {
      dispatch(signInFailed("Unexpected Error happened, Please Sign In again"));
    }
  };

  const fetchData = async (dataToFetch) => {
    const response = await fetch("/api/v1/users/forgetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToFetch),
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const handleChange = (e) => {
    dispatch(startTyping());
    setInputData(e.target.value);
  };

  return (
    <div className="flex flex-col py-14 items-center gap-5 min-w-96 mx-auto w-fit">
      <div className="flex flex-col items-center gap-3 p-10 border border-neutral">
        {error.error && <WarningComponent text={error.message} />}
        <h1 className="text-3xl ">Amine&apos;s Code Chronicles</h1>
        <p className="text-center text-sm pb-3">
          Forgot Your password <br />
          Enter your mail and we will send to you an email to reset your
          password
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={inputData}
              required
            />
          </label>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
      <p className="text-center border border-neutral w-full py-3">
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="text-primary font-bold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
