const mongoose = require("mongoose");

// Declare the Schema of the tutorial category model
var videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    },
    description: {
      type: String,
      required: true,
    },
    video_url: {
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
module.exports = mongoose.model("Video", videoSchema);
