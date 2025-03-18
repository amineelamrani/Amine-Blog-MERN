import whiteBorderLike from "/likeSVGs/like-border-white.svg";
import blackBorderLike from "/likeSVGs/like-border-black.svg";
import blackFullLike from "/likeSVGs/like-full-black.svg";
import whiteFullLike from "/likeSVGs/like-full-white.svg";

import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
} from "date-fns";
import { useState } from "react";

export default function CommentComponent({
  comment,
  theme,
  userId,
  currentUser,
}) {
  const creationDate = new Date(comment.createdAt);
  const daysDifference = differenceInDays(Date.now(), creationDate);
  const [liked, setLiked] = useState(false);

  const handleCommentLikeClick = async () => {
    if (currentUser === null) {
      // we need to have a popup here saying that you need to be logged in
      return;
    }
    try {
      const res = await fetch(`/api/v1/comments/${comment._id}/add/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        comment.likedBy.push(userId);
        setLiked(true);
      } else {
        return;
      }
    } catch (err) {
      return;
    }
  };

  return (
    <div className="flex w-full gap-4 items-start py-5 border-b-2 border-neutral">
      <div className="min-w-10 w-1/12 flex items-start justify-center">
        {comment.owner && (
          <img
            src={comment.owner.profilePicture}
            alt="comment"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black bg-white"
          />
        )}
        {!comment.owner && (
          <img
            src="https://img.icons8.com/?size=100&id=Ib9FADThtmSf&format=png&color=000000"
            alt="comment"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black bg-white"
          />
        )}
      </div>

      <div className="flex flex-col w-11/12 text-wrap">
        <div className="flex items-center gap-1 w-full md:gap-2">
          <h1 className="font-bold">@{comment.ownerName}</h1>
          {daysDifference === 0 && (
            <p className="text-xs">
              {differenceInHours(Date.now(), creationDate)} Hour ago
            </p>
          )}
          {daysDifference < 30 && daysDifference > 0 && (
            <p className="text-xs">{daysDifference} day ago</p>
          )}
          {daysDifference >= 30 && (
            <p className="text-xs">
              {differenceInMonths(Date.now(), creationDate)} day ago
            </p>
          )}
        </div>
        <p className="py-2 w-full text-wrap overflow-hidden">
          {comment.content}
        </p>
        <div className="flex items-center gap-1">
          {comment.likedBy.includes(userId) && (
            <img
              src={theme === "dark" ? whiteFullLike : blackFullLike}
              alt=""
              className="w-8"
            />
          )}
          {!comment.likedBy.includes(userId) && (
            <img
              src={theme === "dark" ? whiteBorderLike : blackBorderLike}
              alt=""
              className="w-8 hover:scale-110 hover:cursor-pointer"
              onClick={handleCommentLikeClick}
            />
          )}
          <p>{comment.likedBy.length} like</p>
        </div>
      </div>
    </div>
  );
}
