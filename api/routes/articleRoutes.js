const express = require("express");
const authController = require("./../controllers/authController");
const articleController = require("./../controllers/articleController");

const router = express.Router();

// Open Public Routes
router.get("/:articleId", articleController.getArticle);

// Routes for authenticated users

// Routes Restricted to admin
router.use(authController.adminRestricted);

//// create article by admin
router.post("/create", articleController.newArticle);
router.delete("/delete/:articleId", articleController.deleteArticle);

module.exports = router;
