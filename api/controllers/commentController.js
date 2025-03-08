const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

exports.addCommentLike = catchAsync(async (req, res, next) => {
  const commentId = req.params.commentId;
  // when liking the comment =>
  // search for the comment => Check if the userID is already liked it
  // if not liked add the userID to the likedBy array list

  const commentConcerned = await Comment.findById(commentId);
  if (commentConcerned.likedBy.includes(req.userId)) {
    return res.status(403).json({
      status: "fail",
      message: "already liked the comment",
    });
  }
  commentConcerned.likedBy.push(req.userId);
  await commentConcerned.save();
  return res.status(200).json({
    status: "success",
    message: "comment liked successfully",
    result: commentConcerned,
  });
});
