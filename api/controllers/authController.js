const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });
  newUser.password = undefined;

  // /!\ Need to send an email to the person in order to confirm the email adress of the user

  return res.status(201).json({
    status: "success",
    result: newUser,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ result: "fail", message: "User Not Found!" });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ result: "fail", message: "email or password is invalid" });
  }
  user.password = undefined;

  return res
    .status(200)
    .cookie("amineBlog", signToken(user._id), {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .json({
      status: "success",
      result: user,
    });
});

// Functions
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET_JWT_KEY);
};
