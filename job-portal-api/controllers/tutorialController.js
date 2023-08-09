const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const validateMongoDbID = require("../middlewares/validateMongoDbID");
const Tutorial = require("../models/tutorial");

const createTutorial = asyncHandler(async (req, res) => {
  try {
    const { title, tutorial_category } = req.body;

    if (title && tutorial_category) {
      req.body.slug = slugify(title.toLowerCase());
      req.body.tutorial_category_slug = slugify(
        tutorial_category.toLowerCase()
      );
    }
    const createTutorial = await Tutorial.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Tutorial created successfully",
      data: createTutorial,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Tutorial Category
const getTutorials = asyncHandler(async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    if (tutorials.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Tutorials found successfully",
        data: tutorials,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single Tutorial Category
const getTutorial = asyncHandler(async (req, res) => {
  const { category_slug, tutorial_slug } = req.params;
  try {
    const tutorial = await Tutorial.findOne({
      slug: tutorial_slug,
      tutorial_category_slug: category_slug,
    });
    const tutorialTopics = await Tutorial.find({
      tutorial_category_slug: category_slug,
    })
      .select("topic_name title slug tutorial_category_slug")
      .sort("craetedAt");
    if (tutorial) {
      res.status(200).json({
        status: "success",
        message: "Tutorial found successfully",
        data: tutorial,
        tutorialTopics,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Update Single Tutorial Category
const updateTutorial = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const { title, tutorial_category } = req.body;
    console.log(title, tutorial_category);
    if (title) {
      req.body.slug = slugify(title.toLowerCase());
    }
    if (tutorial_category) {
      req.body.tutorial_category_slug = slugify(
        tutorial_category.toLowerCase()
      );
    }
    const updatedTutorial = await Tutorial.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedTutorial) {
      res.status(200).json({
        status: "success",
        message: "Tutorial is updated successfully",
        data: updatedTutorial,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial data  found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Tutorial Category
const deleteTutorial = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const deleted = await Tutorial.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Tutorial is deleted successfully",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No tutorial found with this id",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createTutorial,
  getTutorials,
  getTutorial,
  updateTutorial,
  deleteTutorial,
};
