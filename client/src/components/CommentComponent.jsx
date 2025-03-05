import whiteLike from "/white_like.svg";
import darkLike from "/dark_like.svg";
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
} from "date-fns";

export default function CommentComponent({ comment, theme }) {
  const creationDate = new Date(comment.createdAt);
  const daysDifference = differenceInDays(Date.now(), creationDate);

  return (
    <div className="flex w-full gap-4 items-start py-5 border-b-2 border-neutral">
      <div>
        <img
          src={comment.ownerPicture}
          alt="comment"
          className="w-12 h-12 rounded-full border border-black bg-white"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2">
          <h1 className="font-bold">@{comment.ownerName}</h1>
          {daysDifference === 0 && (
            <p>{differenceInHours(Date.now(), creationDate)} Hour ago</p>
          )}
          {daysDifference < 30 && daysDifference > 0 && (
            <p>{daysDifference} day ago</p>
          )}
          {daysDifference >= 30 && (
            <p>{differenceInMonths(Date.now(), creationDate)} day ago</p>
          )}
        </div>
        <p className="py-2">{comment.content}</p>
        <div className="flex items-center gap-1">
          <img
            src={theme === "dark" ? whiteLike : darkLike}
            alt=""
            className="w-8"
          />
          <p>{comment.likedBy.length} like</p>
        </div>
      </div>
    </div>
  );
}
