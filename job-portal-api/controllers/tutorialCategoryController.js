const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const TutorialCategory = require("../models/tutorialCategory");
const validateMongoDbID = require("../middlewares/validateMongoDbID");

const createTutorialCategory = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    if (title) {
      req.body.slug = slugify(title);
    }
    const createTutCategory = await TutorialCategory.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Tutorial category created successfully",
      data: createTutCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Tutorial Category
const getTutorialCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await TutorialCategory.find();
    if (categories.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Tutorial categories found",
        data: categories,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial categories found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single Tutorial Category
const getTutorialCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);
    const category = await TutorialCategory.findById(id);
    if (category) {
      res.status(200).json({
        status: "success",
        message: "Tutorial category found",
        data: category,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial category found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Update Single Tutorial Category
const updateTutorialCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const { title } = req.body;

    if (title) {
      req.body.slug = slugify(title);
    }
    const updatedCategory = await TutorialCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedCategory) {
      res.status(200).json({
        status: "success",
        message: "Tutorial category updated successfully",
        data: updatedCategory,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial category found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Tutorial Category
const deleteTutorialCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const deleted = await TutorialCategory.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Tutorial category deleted successfully",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial category found with this id",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createTutorialCategory,
  getTutorialCategories,
  getTutorialCategory,
  updateTutorialCategory,
  deleteTutorialCategory,
};
