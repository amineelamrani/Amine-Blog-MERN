const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });
  return res.status(202).json({
    status: "success",
    result: newUser,
  });
});
