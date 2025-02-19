const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/signup", authController.signup);

module.exports = router;
