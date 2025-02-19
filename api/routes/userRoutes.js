const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/oauth", authController.oAuth);

module.exports = router;
