const express = require("express");
const {
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
  blockUser,
  unblockUser,
} = require("../controllers/userController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// User routes
router.get("/", authMiddleware, isAdmin, getAllUser);
router.get("/:id", authMiddleware, getUser);
router.put("/update", authMiddleware, updateUser);
router.put("/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
