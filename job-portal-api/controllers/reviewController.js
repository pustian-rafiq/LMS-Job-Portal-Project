const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../middlewares/validateMongoDbID");
const Review = require("../models/review");
const User = require("../models/user");

// Create a new Review
const createReview = asyncHandler(async (req, res) => {
  const { comment, color } = req.body;
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    const reviewData = {
      user_id: _id,
      comment,
      color,
    };
    const createTutorial = await Review.create(reviewData);
    res.status(201).json({
      status: true,
      message: "Review added successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Review
const getReviews = asyncHandler(async (req, res) => {
  try {
    let reviews = await Review.find();

    // Get user information from every review
    // reviews = reviews.map((review) => {
    //   //   console.log("user id", review?._doc?.user_id.valueOf());
    //   //   const userInfo = findUser(review?._doc?.user_id.valueOf()).then(
    //   //     (user) => {
    //   //       console.log("userInfo", user);
    //   //       return user;
    //   //     }
    //   //   );
    //   //   const userInfo = User.findOne({ _id: review?._doc?.user_id.valueOf() });
    //   return {
    //     ...review._doc,
    //   };
    // });
    if (reviews?.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Reviews found successfully",
        data: reviews,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No review found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single Review
const getReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findOne({
      _id: id,
    });

    if (review) {
      res.status(200).json({
        status: "success",
        message: "Review found successfully",
        data: review,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No review found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Update Single Tutorial Category
const updateReviewStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const { isApproved } = req.body;
    console.log(isApproved);
    const updatedReviewStatus = await Review.findByIdAndUpdate(
      id,
      { isApproved: isApproved },
      {
        new: true,
      }
    );
    if (updatedReviewStatus) {
      res.status(200).json({
        status: "success",
        message: "Review is updated successfully",
        data: updatedReviewStatus,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No review data  found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Tutorial Category
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const deleted = await Tutorial.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Review is deleted successfully",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No review found with this id",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get review user profile
const findUser = async (user_id) => {
  const user = await User.findById(user_id, { password: 0 });
  return user;
};
module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReviewStatus,
  deleteReview,
};
