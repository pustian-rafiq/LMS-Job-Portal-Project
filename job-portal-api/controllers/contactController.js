const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../middlewares/validateMongoDbID");
const Contact = require("../models/contact");

// Create a new Review
const createContact = asyncHandler(async (req, res) => {
  const { comment, color } = req.body;

  try {
    const createEnquiry = await Contact.create(req.body);
    res.status(201).json({
      status: true,
      message: "Enquiry added successfully",
      data: createEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Review
const getContacts = asyncHandler(async (req, res) => {
  try {
    let contacts = await Contact.find();

    if (contacts?.length > 0) {
      res.status(200).json({
        status: "success",
        message: "Enquiry found successfully",
        data: contacts,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No enquiry found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single Contact
const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({
      _id: id,
    });

    if (contact) {
      res.status(200).json({
        status: "success",
        message: "Enquiry found successfully",
        data: contact,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No enquiry found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Update Single Tutorial Category
const updateContactStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const { status } = req.body;
    const updatedContactStatus = await Contact.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    if (updatedContactStatus) {
      res.status(200).json({
        status: "success",
        message: "Enquiry is updated successfully",
        data: updatedContactStatus,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No enquiry data  found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Tutorial Category
const deleteContact = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbID(id);

    const deleted = await Contact.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Enquiry is deleted successfully",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No enquiry found with this id",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get review user profile
const findUser = async (user_id) => {
  const user = await User.findById(user_id, { password: 0 });
  return user;
};
module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
};
