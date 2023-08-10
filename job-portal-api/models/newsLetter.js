const mongoose = require("mongoose");

// Declare the Schema of the tutorial category model
var newsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("NewsLetter", newsLetterSchema);
