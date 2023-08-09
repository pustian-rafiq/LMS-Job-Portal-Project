const {
  createTutorial,
  getTutorials,
  getTutorial,
  updateTutorial,
  deleteTutorial,
} = require("../controllers/tutorialController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const tutorialRouter = require("express").Router();

tutorialRouter.post("/", authMiddleware, isAdmin, createTutorial);
tutorialRouter.get("/", getTutorials);
tutorialRouter.get("/:id", authMiddleware, isAdmin, getTutorial);
tutorialRouter.put("/:id", authMiddleware, isAdmin, updateTutorial);
tutorialRouter.delete("/:id", authMiddleware, isAdmin, deleteTutorial);

module.exports = tutorialRouter;
