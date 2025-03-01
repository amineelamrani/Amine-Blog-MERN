import { useSelector } from "react-redux";
import MarkdownInputField from "../../components/MarkdownInputField";
import { useState } from "react";

export default function CreateArticle() {
  const { isLoading } = useSelector((state) => state.user);
  const [inputData, setInputData] = useState({
    title: "",
    category: [],
    summary: "",
    image: "",
    content: "",
  });
  // Here we will have
  //// Title input
  //// Category list
  //// summary input (specify max length and min)
  //// image => a fileInput to send the image to cloudinary
  //// content => a markdown textarea -> Send to the database (when we try to display the content of the article we convert to html)

  // dependancies here => @uiw/react-md-editor / cloudinary

  const handleSubmit = (e) => {};

  return (
    <div className="flex flex-col py-14 items-center gap-5 min-w-96 mx-auto w-full">
      <h1 className="text-3xl font-bold">
        Create Article{" "}
        <span className="text-primary">(This is for Admin Only)</span>
      </h1>
      <p>Write the content of the blog below, Please fill all the places</p>
      <form
        action=""
        className="flex flex-col gap-3 w-full items-center"
        onSubmit={handleSubmit}
      >
        <label className="form-control w-96">
          <span className="label-text">Title :</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </label>

        <label className="form-control w-96 ">
          <span className="label-text">Categories (space between them) :</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-96">
          <span className="label-text">Summary :</span>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Enter Summary here"
          ></textarea>
        </label>

        <label className="form-control w-96 ">
          <span className="label-text">Cover image :</span>
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm w-96 "
          />
        </label>

        <MarkdownInputField />

        <button
          className="btn btn-primary px-24"
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            "Create Article"
          )}
        </button>
      </form>
    </div>
  );
}
