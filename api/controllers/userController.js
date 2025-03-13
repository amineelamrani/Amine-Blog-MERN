const Article = require("../models/articleModel");
const Comment = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const dateDate = require("../utils/dateData");
const dateFns = require("date-fns");

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

// Graphes data to share => (Period : week, month)
//// Evolution of comments per Period [✔]
//// Evolution of Users number per period [✔]
//// Articles distribution per category [⏳]

// Table => (trending/Liked/Active - Latest - Oldest)
//// Comment leaderBoard
//// Users leaderboard
//// Articles leaderboard

exports.adminDashboardGraphsEvolution = catchAsync(async (req, res, next) => {
  //// Evolution of comments per Period [done]
  //// Evolution of Users number per period [done]
  //// Evolution of Articles number per period [done]

  const period = req.params.period * 1;

  const weekArrays = dateDate.weekData("week").slice(-7);
  const monthArrays = dateDate.weekData("month").slice(-7);

  if (period === 7) {
    const usersEvolutionColumns = await getDataPerPeriod("user", weekArrays);
    const articlesEvolutionColumns = await getDataPerPeriod(
      "article",
      weekArrays
    );
    const commentsEvolutionColumns = await getDataPerPeriod(
      "comment",
      weekArrays
    );

    return res.status(202).json({
      data: {
        users: { columns: usersEvolutionColumns, rows: weekArrays.slice(1) },
        articles: {
          columns: articlesEvolutionColumns,
          rows: weekArrays.slice(1),
        },
        comments: {
          columns: commentsEvolutionColumns,
          rows: weekArrays.slice(1),
        },
      },
      rowsData: weekArrays,
    });
  } else if (period === 30) {
    const usersEvolutionColumns = await getDataPerPeriod("user", monthArrays);
    const articlesEvolutionColumns = await getDataPerPeriod(
      "article",
      monthArrays
    );
    const commentsEvolutionColumns = await getDataPerPeriod(
      "comment",
      monthArrays
    );

    return res.status(202).json({
      data: {
        users: { columns: usersEvolutionColumns, rows: monthArrays.slice(1) },
        articles: {
          columns: articlesEvolutionColumns,
          rows: monthArrays.slice(1),
        },
        comments: {
          columns: commentsEvolutionColumns,
          rows: monthArrays.slice(1),
        },
      },
      rowsData: monthArrays,
    });
  }

  res
    .status(400)
    .json({ status: "fail", message: "Cannot proceed your request" });
});

exports.articleDistributionCategory = catchAsync(async (req, res, next) => {
  //// Articles distribution per category [⏳]
  // Here see each category and see it existed in how much articles
  res.json({
    result: "hi",
  });
});

exports.leaderboard = catchAsync(async (req, res, next) => {
  // for leaderboard parts
});

const getDataPerPeriod = async (data, rows) => {
  let dataArrayEvolution = [];
  if (data === "user") {
    for (let i = 0; i < rows.length; i++) {
      if (i < rows.length - 1) {
        const users = await User.find({
          createdAt: { $gte: rows[i], $lt: rows[i + 1] },
        });
        dataArrayEvolution.push(users.length);
      }
    }
  } else if (data === "comment") {
    for (let i = 0; i < rows.length; i++) {
      if (i < rows.length - 1) {
        const comments = await Comment.find({
          createdAt: { $gte: rows[i], $lt: rows[i + 1] },
        });
        dataArrayEvolution.push(comments.length);
      }
    }
  } else if (data === "article") {
    for (let i = 0; i < rows.length; i++) {
      if (i < rows.length - 1) {
        const articles = await Article.find({
          createdAt: { $gte: rows[i], $lt: rows[i + 1] },
        });
        dataArrayEvolution.push(articles.length);
      }
    }
  }
  return dataArrayEvolution;
};
