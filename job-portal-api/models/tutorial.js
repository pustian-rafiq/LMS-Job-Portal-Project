const mongoose = require("mongoose");

// Declare the Schema of the tutorial category model
var tutorialSchema = new mongoose.Schema(
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
    introduction: {
      type: String,
      required: true,
    },
    tutorial_category: {
      type: String,
      required: true,
    },
    tutorial_category_slug: {
      type: String,
      required: true,
    },
    // tutorial_category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "TutorialCategory",
    // },
    topic_name: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Tutorial", tutorialSchema);
