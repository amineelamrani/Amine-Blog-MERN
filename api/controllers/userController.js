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
//// Articles distribution per category [✔]

// Table => (trending/Liked/Active - Latest - Oldest) [⏳]
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
      status: "success",
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
      status: "success",
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
  const articles = await Article.find({});
  let categoryTypes = {};

  for (let i = 0; i < articles.length; i++) {
    // Work with objects
    // Got article by article -> Got the categories [array] -> Got category by category
    // Check in the categroryType object if that article name exist in the key entries (if it exist we add the value of the object 1)
    // And we return the object

    const articleCategories = articles[i].category;

    for (const category of articleCategories) {
      // Check if the category exist in the object categoryTypes (counter)
      if (Object.keys(categoryTypes).includes(category)) {
        categoryTypes = {
          ...categoryTypes,
          [category]: categoryTypes[category] * 1 + 1,
        };
      } else {
        categoryTypes = { ...categoryTypes, [category]: 1 };
      }
    }
  }

  return res.status(200).json({
    status: "success",
    result: categoryTypes,
  });
});

exports.usersLeaderboard = catchAsync(async (req, res, next) => {
  // for leaderboard parts
  const sort = req.params.sort;
  if (sort === "active") {
    // Active => Most of comments having - Most of like to his comments - Most of like to other comments + most articles liked
    //// Most comments having + Most comment like (to his own) => Fetch the comments by the Id and length of the likedBy
    //// Most like of other's comments => see how much that ID is mentionned in the comment.likeBy
    //// most articles liked => user.likedArticles.length

    const users = await User.find(
      {},
      "-password -confirmPassword -uniqueString -isValid -admin -__v"
    );
    let leaderboardArray = [];

    for (const user of users) {
      let userData = {
        comments: 0,
        ownCommentLikes: 0,
        otherCommentLikes: 0,
        articleLikes: 0,
      };

      const comments = await Comment.find({ owner: user._id });
      // Comment that the user own
      userData.comments = comments.length;

      // Most like to all of the user comments
      for (const comment of comments) {
        userData.ownCommentLikes =
          userData.ownCommentLikes + comment.likedBy.length;
      }

      // Most likes to the other comments
      const otherLikedComments = await Comment.find({})
        .where("likedBy")
        .in([user._id])
        .exec();
      userData.otherCommentLikes = otherLikedComments.length;

      // Most articles Liked
      userData.articleLikes = user.likedArticles.length;

      // How to display the data
      const userDataDisplay = {
        _id: user._id,
        name: user.name,
        profilePicture: user.profilePicture,
        email: user.email,
        interactions: userData,
        activity:
          userData.comments * 3 +
          userData.ownCommentLikes * 2 +
          userData.otherCommentLikes * 1 +
          userData.articleLikes * 2,
      };
      leaderboardArray.push(userDataDisplay);
    }

    return res.status(200).json({
      status: "success",
      result: leaderboardArray,
    });
  } else if (sort === "latest") {
    const users = await User.find(
      {},
      "-password -confirmPassword -uniqueString -isValid -admin -__v"
    ).sort("-createdAt");

    return res.status(200).json({
      status: "success",
      result: users,
    });
  } else if (sort === "oldest") {
    const users = await User.find(
      {},
      "-password -confirmPassword -uniqueString -isValid -admin -__v"
    ).sort("createdAt");

    return res.status(200).json({
      status: "success",
      result: users,
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Cannot process your request",
  });
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
