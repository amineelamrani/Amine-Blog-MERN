import MarkdownInputField from "../../components/MarkdownInputField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  createArticleFailed,
  startTyping,
  startUploadArticle,
  uploadsuccess,
} from "../../redux/article/articleSlice";

export default function CreateArticle() {
  const [inputData, setInputData] = useState({
    title: "",
    category: "",
    summary: "",
    image: "",
    content: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const { isLoading, error } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState({
  //   isloading: false,
  //   message: "",
  // });
  // const [error, setError] = useState({ error: false, message: "" });

  let navigate = useNavigate();

  //Cloudinary infos
  const cloudName = import.meta.env.VITE_CLOUDINARY_cloudName;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_uploadPreset;

  const handleSubmit = async (e) => {
    // we have to manage error things (user should have an idea on the status of uploading : uploading image ongoing, ... )
    e.preventDefault();
    // Check if image selected
    if (!selectedFile) {
      console.log("there is an error");
      return dispatch(createArticleFailed("There is no file selected"));
      // return setError({ error: true, message: "There is no file selected" });
    }
    // upload to cloudinary
    // setIsLoading({
    //   isloading: true,
    //   message: "Uploading the image to cloudianry...",
    // });
    dispatch(startUploadArticle("Uploading the image to cloudianry..."));
    const imageUrl = await handleUploadCloudinary(
      cloudName,
      uploadPreset,
      selectedFile
    );
    // if uploaded successfully => Send article infos to the server
    if (imageUrl) {
      dispatch(startUploadArticle("Uploading article data to the server..."));
      // setError({ error: false, message: "" });
      // setIsLoading({
      //   isloading: true,
      //   message: "Uploading article data to the server...",
      // });
      const cat = inputData.category
        .trim()
        .split(" ")
        .filter((el) => el != "");
      const articleCreate = await fetchCreateArticle({
        title: inputData.title,
        content: inputData.content,
        summary: inputData.summary,
        category: cat,
        image: imageUrl,
      });
      console.log(articleCreate);
      if (articleCreate && articleCreate.status === "success") {
        dispatch(uploadsuccess());
        // setError({ error: false, message: "" });
        // setIsLoading({
        //   isloading: false,
        //   message: "",
        // });
        // reset errors and loading and go to the article page -> To see the uploaded version on the front end
        navigate(`/article/read/${articleCreate.result._id}`);
      }
    } else {
      dispatch(
        createArticleFailed(
          "An error happened while uploading to cloudinary server"
        )
      );
      // setError({
      //   error: true,
      //   message: "An error happened while uploading to cloudinary server",
      // });
    }
  };

  const handleUploadCloudinary = async (cloudName, uploadPreset, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "articlesAssets");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.url;
    } catch (err) {
      return null;
    }
  };

  const fetchCreateArticle = async (dataToFetch) => {
    const response = await fetch("/api/v1/articles/create", {
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
    // setIsLoading({
    //   isloading: false,
    //   message: "",
    // });
    dispatch(startTyping());
    setInputData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleMarkdownChange = (e) => {
    // setIsLoading({
    //   isloading: false,
    //   message: "",
    // });
    dispatch(startTyping());
    setInputData((values) => ({ ...values, ["content"]: e }));
  };

  const handleFileChange = (e) => {
    // setIsLoading({
    //   isloading: false,
    //   message: "",
    // });
    dispatch(startTyping());
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
      }
    }
  };

  return (
    <div className="flex flex-col py-14 items-center gap-5 min-w-96 mx-auto w-full">
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

      {isLoading.isloading && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-warning">
            <span className="loading loading-spinner loading-xs"></span>
            <span>{isLoading.message}</span>
          </div>
        </div>
      )}

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
            name="title"
            value={inputData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-control w-96 ">
          <span className="label-text">Categories (space between them) :</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            name="category"
            value={inputData.category}
            onChange={handleChange}
            required
          />
        </label>

        <div className="flex flex-wrap gap-2 mx-auto">
          {inputData.category.trim() != "" &&
            inputData.category
              .trim()
              .split(" ")
              .map(
                (element, index) =>
                  element !== "" && (
                    <p key={index} className="badge badge-neutral">
                      {element}
                    </p>
                  )
              )}
        </div>

        <label className="form-control w-96">
          <span className="label-text">Summary :</span>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Enter Summary here"
            name="summary"
            value={inputData.summary}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label className="form-control w-96 ">
          <span className="label-text">Cover image :</span>
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm w-96 "
            accept="image/"
            onChange={handleFileChange}
          />
        </label>

        <MarkdownInputField
          value={inputData.content}
          handleChange={handleMarkdownChange}
        />

        <button
          className="btn btn-primary px-24"
          type="submit"
          disabled={isLoading.isloading ? true : false}
        >
          {isLoading.isloading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            "Create Article"
          )}
        </button>
      </form>
    </div>
  );
}
