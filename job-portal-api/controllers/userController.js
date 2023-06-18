const validateMongoDbID = require("../middlewares/validateMongoDbID");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Get all user
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select(["-password", "-__v"]);
    res.status(200).json({
      status: "success",
      message: "All user is fetched successfully",
      users,
    });
  } catch (err) {
    // throw new Error(err);
    res.status(400).json({ message: error.message });
  }
});

// Update a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbID(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({
      status: "success",
      message: "User is updated successfully",
      user,
    });
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  getAllUser,
  updateUser,
};
