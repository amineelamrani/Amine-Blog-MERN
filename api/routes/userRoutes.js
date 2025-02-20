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

// To protect routes
// router.use(authController.protect);

// protected routes

module.exports = router;
