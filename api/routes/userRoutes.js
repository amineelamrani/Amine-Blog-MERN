const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/oauth", authController.oAuth);
router.get("/signout", authController.signOut);
router.get("/verify", authController.verifyAccount);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/resetPassword/:email/:token", authController.resetPassword);

// To protect routes
router.use(authController.protect);

// protected routes
router.post("/changePicture", userController.changeProfilePicture);
router.get("/delete", authController.deleteAccount);

// Admin restricted routes
router.use(authController.adminRestricted);

// Admin routes
router.get(
  "/admin/highlights/:period",
  userController.adminDashboardHighlights
);
router.get(
  "/admin/graphs/evolution/:period",
  userController.adminDashboardGraphsEvolution
);
router.get(
  "/admin/graphs/catDistribution",
  userController.articleDistributionCategory
);

router.get(
  "/admin/graphs/leaderboard/users/:sort",
  userController.usersLeaderboard
);

router.get(
  "/admin/graphs/leaderboard/comments/:sort",
  userController.commentsLeaderboard
);

router.get(
  "/admin/graphs/leaderboard/articles/:sort",
  userController.articlesLeaderboard
);

module.exports = router;
