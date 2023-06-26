const { generateToken } = require("../config/jwtToken");
const validateMongoDbID = require("../middlewares/validateMongoDbID");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendMail = require("../controllers/emailController");
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

// Update password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { oldPassword, newPassword } = req.body;
  validateMongoDbID(_id);

  try {
    const user = await User.findById(_id);
    if (oldPassword === newPassword) {
      throw new Error("Your new password can't be same with old password");
    } else {
      if (user && (await user.isPasswordMatched(newPassword))) {
        throw new Error("Please enter a new password instead of the old one");
      } else {
        user.password = newPassword;
        await user.save();
        res.status(200).json({
          status: "success",
          message: "Password updated successfully",
        });
      }
    }
  } catch (err) {
    throw new Error(err);
  }
});

// Forgot password token
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("User not found with the email " + email);

  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetLink = `http://localhost:5000/api/auth/reset_password/${token}`;

    const data = {
      to: email,
      text: `Hey ${user.first_name} ${user.last_name}`,
      subject: "Forgot Password",
      html: resetLink,
    };
    sendMail(data);
    res.status(200).json(resetLink);
  } catch (err) {
    throw new Error(err);
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordReserExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token expired, Please try again");

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
});
module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
};
