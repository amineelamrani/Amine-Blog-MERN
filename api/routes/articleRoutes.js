const express = require("express");
const authController = require("./../controllers/authController");
const articleController = require("./../controllers/articleController");

const router = express.Router();

// Open Public Routes
router.get("/:articleId", articleController.getArticle);

// Routes for authenticated users
router.use(authController.protect);

router.post("/:articleId/add/comment", articleController.addArticleComment);
router.post("/:articleId/add/like", articleController.addArticleLike);

// Routes Restricted to admin
router.use(authController.adminRestricted);

//// create article by admin
router.get("/check/checkAdmin", authController.checkAdminRight);
router.post("/create", articleController.newArticle);
router.delete("/delete/:articleId", articleController.deleteArticle);

module.exports = router;
