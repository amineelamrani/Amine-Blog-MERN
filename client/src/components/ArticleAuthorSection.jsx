import { useSelector } from "react-redux";
import CopySvgComponent from "./svgComponents/CopySvgComponent";
import whiteBorderLike from "/likeSVGs/like-border-white.svg";
import blackBorderLike from "/likeSVGs/like-border-black.svg";
import blackFullLike from "/likeSVGs/like-full-black.svg";
import whiteFullLike from "/likeSVGs/like-full-white.svg";

export default function ArticleAuthorSection({
  author,
  articleId,
  isArticleLiked,
  setIsArticleLiked,
}) {
  const { theme, currentUser } = useSelector((state) => state.user);

  const handleCopyText = async (e) => {
    try {
      await navigator.clipboard.writeText(e.target.baseURI);
    } catch (error) {
      return;
    }
  };

  const handleLikeClick = async () => {
    if (currentUser === null) {
      // we need to have a popup here saying that you need to be logged in
      return;
    }

    try {
      const res = await fetch(`/api/v1/articles/${articleId}/add/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setIsArticleLiked(true);
      } else {
        return;
      }
    } catch (err) {
      return;
    }
  };

  return (
    <>
      {author.name && (
        <div className="flex justify-between gap-5 w-full px-5 lg:px-14 py-5 border-t-2 border-b-2">
          <div className="flex gap-2 items-center">
            <img
              src={author.profilePicture}
              alt="author image"
              className="w-8 h-8 md:w-14 md:h-14 rounded-full border bg-white"
            />
            <ul className="flex flex-col items-start ">
              <li className="font-bold text-base md:text-lg">{author.name}</li>
              <li className="text-base-content text-sm md:text-base">Admin</li>
            </ul>
          </div>
          <div className="flex gap-4 items-center">
            {!isArticleLiked && (
              <img
                src={theme === "dark" ? whiteBorderLike : blackBorderLike}
                alt=""
                className="w-5 h-5 md:w-8 md:h-8 hover:scale-105 hover:cursor-pointer"
                onClick={handleLikeClick}
              />
            )}
            {isArticleLiked && (
              <img
                src={theme === "dark" ? whiteFullLike : blackFullLike}
                alt=""
                className="w-5 h-5 md:w-8 md:h-8"
              />
            )}
            <button
              className="btn btn-tiny md:btn-base"
              onClick={handleCopyText}
            >
              <CopySvgComponent theme={theme} />
              Copy link
            </button>
          </div>
        </div>
      )}
    </>
  );
}
