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

export default function ResetPassword() {
  // after clicking on submit in forgot password
  // here have a form for the token - password and confirmPassword
  // and if resetted successfully (redirect to home page)
  // same logic as confirmAccount for managing the states
  // navigate(`/reset-password/${inputData}`);
  const [inputData, setInputData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  let params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const email = params.email;

  // Functions

  const handleChange = (e) => {
    dispatch(startTyping());
    setInputData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataReceived = await fetchData(email, inputData);
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
        dispatch(signInFailed("Cannot Reset your Password!"));
      }
    } catch (err) {
      dispatch(signInFailed("Unexpected Error happened, Please Sign In again"));
    }
  };

  const fetchData = async (email, dataToFetch) => {
    const response = await fetch(
      `/api/v1/users/resetPassword/${email}/${dataToFetch.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: dataToFetch.password,
          confirmPassword: dataToFetch.confirmPassword,
        }),
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

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Token"
            name="token"
            onChange={handleChange}
            value={inputData.token}
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
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={inputData.confirmPassword}
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
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
