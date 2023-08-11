const {
  createVideo,
  getVideos,
  getVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const videoRouter = require("express").Router();

videoRouter.post("/", authMiddleware, isAdmin, createVideo);
videoRouter.get("/", getVideos);
videoRouter.get("/:slug", getVideo);
videoRouter.put("/:id", authMiddleware, isAdmin, updateVideo);
videoRouter.delete("/:id", authMiddleware, isAdmin, deleteVideo);

module.exports = videoRouter;
