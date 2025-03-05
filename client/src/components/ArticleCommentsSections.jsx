import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import AddCommentSection from "./AddCommentSection";

export default function ArticleCommentsSections({ articleId }) {
  const [commentsFetched, setCommentsFetched] = useState(null);
  const { theme, currentUser } = useSelector((state) => state.user);
  const [inputData, setInputData] = useState("");
  const [updateComment, setUpdateComment] = useState(true);

  useEffect(() => {
    const fetchData = async (articleId) => {
      const comments = await fetch(`/api/v1/articles/${articleId}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await comments.json();
      if (data.status === "success") {
        return setCommentsFetched(data.result);
      }
    };

    fetchData(articleId);
  }, [updateComment]);

  return (
    <div
      id="article-comments-section"
      className="flex flex-col gap-5 w-full lg:px-32 py-5"
    >
      {currentUser === null && (
        <h1 className="text-info">
          You must be logged in to comment.{" "}
          <Link to="/sign-in" className="text-accent">
            Login
          </Link>
        </h1>
      )}

      {currentUser !== null && (
        <AddCommentSection
          articleId={articleId}
          inputData={inputData}
          setInputData={setInputData}
          setUpdateComment={setUpdateComment}
        />
      )}

      {commentsFetched != null && (
        <>
          <div className="flex gap-2 items-center">
            <h2>Comments </h2>
            <p className="border px-2">{commentsFetched.length}</p>
          </div>

          <div className="px-10">
            {commentsFetched.map((element, index) => (
              <CommentComponent comment={element} key={index} theme={theme} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
