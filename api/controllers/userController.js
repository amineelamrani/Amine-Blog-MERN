const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

exports.changeProfilePicture = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { url } = req.body;
  const concernedUser = await User.findByIdAndUpdate(userId, {
    profilePicture: url,
  });
  if (!concernedUser) {
    return res
      .status(404)
      .json({ status: "fail", message: "Cannot update your profile picture" });
  }
  res.status(202).json({
    status: "success",
    message: "profile Picture Updated successfully",
  });
});
