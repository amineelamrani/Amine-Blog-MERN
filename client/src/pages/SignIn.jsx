import { Link, useNavigate } from "react-router";
import OAuth from "../components/OAuth";
import { useState } from "react";
import WarningComponent from "../components/WarningComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  signInDone,
  signInFailed,
  startAuth,
  startTyping,
} from "../redux/user/userSlice";

export default function SignIn() {
  // Managing States
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataReceived = await fetchData(inputData);
      dispatch(startAuth());
      if (dataReceived && dataReceived.status === "success") {
        const data = {
          email: dataReceived.result.email,
          name: dataReceived.result.name,
          profilePicture: dataReceived.result.profilePicture,
        };
        dispatch(signInDone(data));
        navigate("/");
      } else if (dataReceived.status === "fail") {
        dispatch(signInFailed(dataReceived.message));
      }
    } catch (err) {
      dispatch(signInFailed("Unexpected Error happened, Please Sign In again"));
    }
  };

  const fetchData = async (dataToFetch) => {
    const response = await fetch("/api/v1/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToFetch),
    });
    const data = await response.json();
    return data;
  };

  const handleChange = (e) => {
    dispatch(startTyping());
    setInputData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col py-14 items-center gap-5 w-full md:min-w-96 mx-auto md:w-fit">
      <div className="flex flex-col items-center gap-3 p-10 border border-neutral">
        {error.error && <WarningComponent text={error.message} />}
        <h1 className="text-3xl ">Amine&apos;s Code Chronicles</h1>
        <p className="text-center">
          Unlock the Future of Tech - Dive into Amine&apos;s Code Chronicles and
          <br />
          Elevate Your Programming Journey!
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
              value={inputData.email}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={inputData.password}
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
              "Log In"
            )}
          </button>
        </form>
        <OAuth />
        <div
          id="or-holder"
          className="relative w-full flex flex-col items-center"
        >
          <hr className="w-full border-neutral" />
          <p className="-translate-y-1/2 text-center bg-base-100 px-2 font-bold">
            OR
          </p>
        </div>
        <Link to="/forgot-password">
          <button>Forgot password?</button>
        </Link>
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
