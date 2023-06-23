const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  console.log("req", req);
  let token;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers?.authorization?.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        // console.log("user", decoded, user);
        req.user = user;
        next();
      }
    } catch (err) {
      throw new Error("You are not authorized user. Please login first.");
    }
  } else {
    throw new Error("There is no authorization token. Please login first.");
  }
});

// Check whether the user is instructor or not
const isInstructor = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const findUser = await User.findOne(email);

  if (findUser.role !== "instructor") {
    throw new Error("Your are not an Instructor");
  } else {
    next();
  }
});

// Check whether the user is admin or not
const isAdmin = asyncHandler(async (req, res, next) => {
  console.log("isAdmin", req.user);
  const { email } = req.user;
  const findUser = await User.findOne({ email });

  if (findUser.role !== "admin") {
    throw new Error("Your are not an Admin");
  } else {
    next();
  }
});

module.exports = {
  authMiddleware,
  isAdmin,
  isInstructor,
};
