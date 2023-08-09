const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const TutorialCategory = require("../models/tutorialCategory");

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

    console.log("categories", categories);
    if (categories.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Tutorial categories found",
        data: categories,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Tutorial categories not found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createTutorialCategory,
  getTutorialCategories,
};
