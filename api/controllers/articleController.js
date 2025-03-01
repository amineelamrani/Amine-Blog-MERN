const express = require("express");
const Article = require("./../models/articleModel");
const catchAsync = require("./../utils/catchAsync");

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
