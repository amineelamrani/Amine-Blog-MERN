const express = require("express");
const authController = require("./../controllers/authController");
const commentController = require("./../controllers/commentController");

const router = express.Router();

////// Routes for authenticated users
router.use(authController.protect);

router.post("/:commentId/add/like", commentController.addCommentLike);

module.exports = router;
