const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "You should provide a Title for the article"],
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "You should provide a cover image"],
    },
    content: {
      type: String,
      required: [true, "You should provide the content of the article"],
    },
    timesLiked: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: [
      {
        type: String,
      },
    ],
    summary: {
      type: String,
      require: [true, "You must provide a summary"],
    },
    readTime: {
      // This will be like a pointer that will go up whenever we have an article read in the router specified
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
