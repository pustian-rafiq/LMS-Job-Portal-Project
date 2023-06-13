const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  // First check if the user is already registered or not
  const email = req.body.email;

  //   find the user with the given email
  const findUser = await User.findOne({ email: email });

  console.log(findUser);
  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } else {
    throw new Error("User already registered");
  }
});

module.exports = {
  registerUser,
};
