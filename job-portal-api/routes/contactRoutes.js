const {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const contactRouter = require("express").Router();

contactRouter.post("/", authMiddleware, createContact);
contactRouter.get("/", getContacts);
contactRouter.get("/:id", authMiddleware, isAdmin, getContact);
contactRouter.put("/:id", authMiddleware, isAdmin, updateContactStatus);
contactRouter.delete("/:id", authMiddleware, isAdmin, deleteContact);

module.exports = contactRouter;
