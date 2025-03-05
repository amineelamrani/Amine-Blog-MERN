import { useState } from "react";
import { useSelector } from "react-redux";

export default function AddCommentSection({
  articleId,
  inputData,
  setInputData,
  setUpdateComment,
}) {
  const { theme } = useSelector((state) => state.user);

  const handleClick = async () => {
    console.log(inputData);
    if (inputData.trim() != "") {
      try {
        const dataFetched = await fetchData({ content: inputData });
        if (dataFetched && dataFetched.status === "success") {
          setInputData("");
          setUpdateComment((state) => !state);
          console.log("comment added");
        }
      } catch (err) {
        console.log("There is an error : ", ee);
      }
    }
  };

  const fetchData = async (dataToFetch) => {
    const response = await fetch(`/api/v1/articles/${articleId}/add/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToFetch),
    });
    const data = await response.json();
    return data;
  };

  return (
    <div className="flex">
      <label className="input input-bordered flex  w-full">
        <input
          type="text"
          className="grow"
          placeholder="Add comment..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </label>
      <svg
        fill={theme === "dark" ? "#ffffff" : "#000000"}
        className="w-12 h-12 px-1 hover:cursor-pointer"
        viewBox="0 0 32 32"
        id="icon"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
      >
        <path d="M27.71,4.29a1,1,0,0,0-1.05-.23l-22,8a1,1,0,0,0,0,1.87l9.6,3.84,3.84,9.6A1,1,0,0,0,19,28h0a1,1,0,0,0,.92-.66l8-22A1,1,0,0,0,27.71,4.29ZM19,24.2l-2.79-7L21,12.41,19.59,11l-4.83,4.83L7.8,13,25.33,6.67Z"></path>
        <rect
          id="_Transparent_Rectangle_"
          data-name="<Transparent Rectangle>"
          style={{ fill: "none" }}
          width="32"
          height="32"
        ></rect>
      </svg>
    </div>
  );
}
