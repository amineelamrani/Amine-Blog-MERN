const Article = require("../models/articleModel");
const Comment = require("../models/commentModel");
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

exports.adminDashboardHighlights = catchAsync(async (req, res, next) => {
  // Highlights to share
  // Total number of users
  // Total Number of articles
  // Total Number of comments
  // Number of comments this week
  // Number of new articles this week
  // Number of new Users joined this week
  const period = req.params.period * 1;
  const endDate = Date.now();
  const startDate = new Date(endDate - period * 24 * 3600 * 1000);

  const users = await User.find({});
  const articles = await Article.find({});
  const comments = await Comment.find({});
  const weeklyUsers = await User.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  const weeklyArticles = await Article.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  const weeklyComments = await Comment.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const numberUsers = users.length;
  const numberArticles = articles.length;
  const numberComments = comments.length;
  const weeklyUsersNumber = weeklyUsers.length;
  const weeklyArticlesNumber = weeklyArticles.length;
  const weeklyCommentsNumber = weeklyComments.length;

  res.status(202).json({
    status: "success",
    result: {
      numberUsers,
      numberArticles,
      numberComments,
      weeklyUsersNumber,
      weeklyArticlesNumber,
      weeklyCommentsNumber,
    },
  });
});

exports.adminDashboardGraphs = catchAsync(async (req, res, next) => {
  // Graphes data to share => (Period : week, month)
  // Evolution of comments per Period
  // Evolution of Users number per period
  // Articles distribution per category
  // Table => (trending/Liked/Active - Latest - Oldest)
  // Comment leaderBoard
  // Users leaderboard
  // Articles leaderboard
});
