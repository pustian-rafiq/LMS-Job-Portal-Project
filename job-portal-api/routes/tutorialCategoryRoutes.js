const {
  createTutorialCategory,
  getTutorialCategories,
} = require("../controllers/tutorialCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const tutorialCategoryRouter = require("express").Router();

tutorialCategoryRouter.post(
  "/",
  authMiddleware,
  isAdmin,
  createTutorialCategory
);
tutorialCategoryRouter.get("/", getTutorialCategories);
tutorialCategoryRouter.get("/:id", createTutorialCategory);
tutorialCategoryRouter.put("/:id", createTutorialCategory);
tutorialCategoryRouter.delete("/:id", createTutorialCategory);

module.exports = tutorialCategoryRouter;
