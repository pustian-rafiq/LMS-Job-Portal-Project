const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const validateMongoDbID = require("../middlewares/validateMongoDbID");
const Document = require("../models/document");

const createDocument = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { _id } = req.user;
  validateMongoDbID(_id);

  try {
    if (title) {
      req.body.slug = slugify(title.toLowerCase());
    }
    const docData = {
      ...req.body,
      author: _id,
    };
    const createdDocument = await Document.create(docData);

    res.status(201).json({
      status: "success",
      message: "Document is created successfully",
      data: createdDocument,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Documents
const getDocuments = asyncHandler(async (req, res) => {
  try {
    const documents = await Document.find();
    if (documents?.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Documents found successfully",
        data: documents,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No document found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single Document
const getDocument = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const document = await Document.findOne({
      slug: slug,
    });
    if (document) {
      res.status(200).json({
        status: "success",
        message: "Document found successfully",
        data: document,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No video found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Update Single Document
const updateDocument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const { title } = req.body;
    if (title) {
      req.body.slug = slugify(title.toLowerCase());
    }

    const updatedDocument = await Document.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedDocument) {
      res.status(200).json({
        status: "success",
        message: "Document is updated successfully",
        data: updatedDocument,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No document data  found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Document
const deleteDocument = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const deletedDocument = await Document.findByIdAndDelete(id);
    if (deletedDocument) {
      res.status(200).json({
        status: "success",
        message: "Document is deleted successfully",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No document found with this id",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};
