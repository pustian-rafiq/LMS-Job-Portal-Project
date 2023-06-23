const express = require("express");
const {
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// User routes
router.get("/", authMiddleware, isAdmin, getAllUser);
router.put("/update", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
