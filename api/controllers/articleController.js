const express = require("express");
const Article = require("./../models/articleModel");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

// CreateArticle
exports.newArticle = catchAsync(async (req, res, next) => {
  const { title, image, content, author, category, summary } = req.body;
  const newArticle = await Article.create({
    title,
    image,
    content,
    author: req.userIdAdm,
    category,
    summary,
  });
  if (!newArticle) {
    return res.status(400).json({
      status: "fail",
      message: "Cannot create the article provided",
    });
  }
  return res.status(201).json({
    status: "success",
    result: newArticle,
  });
});

// Get Article by ID
exports.getArticle = catchAsync(async (req, res, next) => {
  const queryArticle = await Article.findById(req.params.articleId)
    .populate("author", "name")
    .exec();
  if (!queryArticle) {
    return res.status(400).json({
      status: "fail",
      message: "No article with the provided Id",
    });
  }

  res.status(202).json({
    status: "success",
    result: queryArticle,
  });
});

// delete article by ID
exports.deleteArticle = catchAsync(async (req, res, next) => {
  const deletingArticle = await Article.findByIdAndDelete(req.params.articleId);

  if (!deletingArticle)
    return res
      .status(400)
      .json({ status: "fail", message: "Cannot delete the article provided" });

  res.status(201).json({ status: "success", message: "deleted successfully" });
});

// Add comment to the specified article
exports.addArticleComment = catchAsync(async (req, res, next) => {
  const articleId = req.params.articleId;
  const { content } = req.body;
  const commentingUser = await User.findById(req.userId);

  const addedComment = await Comment.create({
    content,
    articleId,
    owner: req.userId,
    ownerName: commentingUser.name,
    ownerPicture: commentingUser.profilePicture,
  });

  return res.status(202).json({
    status: "success",
    result: addedComment,
  });
});

exports.addArticleLike = catchAsync(async (req, res, next) => {
  const articleId = req.params.articleId;
  // when liking
  // in the User model    => add the articleId to the array of likedArticles
  const likingUser = await User.findById(req.userId);
  if (likingUser.likedArticles.includes(articleId)) {
    return res.status(403).json({
      status: "fail",
      message: "already liked this article",
    });
  }
  const likedArticle = await Article.findById(articleId);
  likingUser.likedArticles.push(articleId);

  // in the Article model => add +1 to the timesLiked item
  likedArticle.timesLiked++;

  await likingUser.save();
  await likedArticle.save();

  return res.status(200).json({
    status: "success",
    result: {
      article: likedArticle,
      user: likingUser,
    },
  });
});
