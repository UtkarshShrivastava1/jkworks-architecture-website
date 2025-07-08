const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Standard route, controller handles response
router.post("/login", authController.login);

module.exports = router;
