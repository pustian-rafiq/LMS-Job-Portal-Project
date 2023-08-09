const mongoose = require("mongoose");

// Declare the Schema of the tutorial category model
var tutorialCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
      default:
        "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("TutorialCategory", tutorialCategorySchema);
