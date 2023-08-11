const {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers/docController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const documentRouter = require("express").Router();

documentRouter.post("/", authMiddleware, isAdmin, createDocument);
documentRouter.get("/", getDocuments);
documentRouter.get("/:slug", getDocument);
documentRouter.put("/:id", authMiddleware, isAdmin, updateDocument);
documentRouter.delete("/:id", authMiddleware, isAdmin, deleteDocument);

module.exports = documentRouter;
