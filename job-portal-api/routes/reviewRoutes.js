const {
  createReview,
  getReviews,
  getReview,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/reviewController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const reviewRouter = require("express").Router();

reviewRouter.post("/", authMiddleware, createReview);
reviewRouter.get("/", getReviews);
reviewRouter.get("/:id", authMiddleware, isAdmin, getReview);
reviewRouter.put("/:id", authMiddleware, isAdmin, updateReviewStatus);
reviewRouter.delete("/:id", authMiddleware, isAdmin, deleteReview);

module.exports = reviewRouter;
