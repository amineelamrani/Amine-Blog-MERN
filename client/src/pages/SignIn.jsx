import { Link } from "react-router";
import OAuth from "../components/OAuth";
import { useState } from "react";

export default function SignIn() {
  // Managing States
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    // Again the cookies cant see them in the application
    e.preventDefault();
    const response = await fetch("/api/v1/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const data = await response.json();
    console.log(data);
  };

  // const fetchData = async (dataToFetch) => {
  //   const response = await fetch("http://localhost:3000/api/v1/users/signin", {
  //     method: "POST",

  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(dataToFetch),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  const handleChange = (e) => {
    setInputData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col py-14 items-center gap-5 min-w-96 mx-auto w-fit">
      <div className="flex flex-col items-center gap-3 p-10 border border-neutral">
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
          <button className="btn btn-primary" type="submit">
            Log In
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
