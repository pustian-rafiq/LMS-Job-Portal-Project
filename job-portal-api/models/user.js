const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Declare the Schema of the User model
var userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    user_image: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    profession: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChnagedAt: Date,
    passwordResetToken: String,
    passwordReserExpires: Date,
    stripe_account_id: String,
    atripe_seller: {},
    stripe_session: {},
  },
  {
    timestamps: true,
  }
);

// Bcrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const generateSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, generateSalt);
  next();
});

// Matched the password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordReserExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resetToken;
};
//Export the model
module.exports = mongoose.model("User", userSchema);
