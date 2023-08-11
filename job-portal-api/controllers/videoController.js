const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const validateMongoDbID = require("../middlewares/validateMongoDbID");
const Video = require("../models/video");

const createVideo = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    if (title) {
      req.body.slug = slugify(title.toLowerCase());
    }
    const createdVideo = await Video.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Video is created successfully",
      data: createdVideo,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Video
const getVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find();
    if (videos?.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Videos found successfully",
        data: videos,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No video found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single Video
const getVideo = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const video = await Video.findOne({
      slug: slug,
    });
    console.log(video);
    if (video) {
      res.status(200).json({
        status: "success",
        message: "Video found successfully",
        data: video,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No video found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Update Single Video
const updateVideo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const { title } = req.body;
    if (title) {
      req.body.slug = slugify(title.toLowerCase());
    }

    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedVideo) {
      res.status(200).json({
        status: "success",
        message: "Video is updated successfully",
        data: updatedVideo,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No video data  found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Tutorial Category
const deleteVideo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const deletedVideo = await Video.findByIdAndDelete(id);
    if (deletedVideo) {
      res.status(200).json({
        status: "success",
        message: "Video is deleted successfully",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No video found with this id",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createVideo,
  getVideos,
  getVideo,
  updateVideo,
  deleteVideo,
};
