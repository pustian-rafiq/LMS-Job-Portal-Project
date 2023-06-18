const express = require("express");
const { getAllUser, updateUser } = require("../controllers/userController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// User routes
router.get("/", authMiddleware, isAdmin, getAllUser);
router.put("/update", authMiddleware, updateUser);

module.exports = router;
