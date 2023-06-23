const express = require("express");
const {
  registerUser,
  loginUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-password", authMiddleware, updatePassword);
router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
