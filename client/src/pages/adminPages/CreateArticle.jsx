import { useSelector } from "react-redux";
import MarkdownInputField from "../../components/MarkdownInputField";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateArticle() {
  const { isLoading } = useSelector((state) => state.user);
  const [inputData, setInputData] = useState({
    title: "",
    category: "",
    summary: "",
    image: "",
    content: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
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
      return;
    }
    // upload to cloudinary
    const imageUrl = await handleUploadCloudinary(
      cloudName,
      uploadPreset,
      selectedFile
    );
    // if uploaded successfully => Send article infos to the server
    if (imageUrl) {
      const articleCreate = await fetchCreateArticle({
        title: inputData.title,
        content: inputData.content,
        summary: inputData.summary,
        category: inputData.category.trim().split(" "),
        image: imageUrl,
      });
      console.log(articleCreate);
      if (articleCreate && articleCreate.status === "success") {
        // reset errors and loading and go to the article page -> To see the uploaded version on the front end
        navigate("/");
      }
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
    setInputData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleMarkdownChange = (e) => {
    setInputData((values) => ({ ...values, ["content"]: e }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
      }
    }
  };

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
