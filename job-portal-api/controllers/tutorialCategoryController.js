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

module.exports = {
  createTutorialCategory,
};
