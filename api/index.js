const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const userRouter = require("./routes/userRoutes");
const articleRouter = require("./routes/articleRoutes");
const commentRouter = require("./routes/commentRoutes");

// Start express App
const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));

// Database connexion
const DB = process.env.DB_URL.replace("<db_password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("Database connection successful!!"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/comments", commentRouter);

app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "./../client/dist/index.html"));
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

// Server Starting
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
