const {
  createTutorialCategory,
  getTutorialCategories,
  getTutorialCategory,
  updateTutorialCategory,
  deleteTutorialCategory,
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
tutorialCategoryRouter.get(
  "/:id",
  authMiddleware,
  isAdmin,
  getTutorialCategory
);
tutorialCategoryRouter.put(
  "/:id",
  authMiddleware,
  isAdmin,
  updateTutorialCategory
);
tutorialCategoryRouter.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  deleteTutorialCategory
);

module.exports = tutorialCategoryRouter;
