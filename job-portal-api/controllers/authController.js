const { generateToken } = require("../config/jwtToken");
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
    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } else {
    throw new Error("User already registered");
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists or not

  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(200).json({
      status: "success",
      message: "User login successfully",
      role: findUser.role,
      token: generateToken(findUser?._id, findUser?.role),
      username: findUser.role,
      user_image: findUser.user_image,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
