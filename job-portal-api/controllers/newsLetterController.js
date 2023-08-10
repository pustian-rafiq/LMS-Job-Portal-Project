const asyncHandler = require("express-async-handler");
const validateMongoDbID = require("../middlewares/validateMongoDbID");
const NewsLetter = require("../models/newsLetter");
const validator = require("email-validator");

// Subscribe to the newsletter
const subscribeNewsLetter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists first of all
    const checkSubscription = await NewsLetter.find({ email });

    // If it doesn't..
    if (checkSubscription.length === 0) {
      // Validate the subscription email
      if (validator.validate(email)) {
        const createTutorial = await NewsLetter.create({ email });

        res.status(201).json({
          status: "success",
          message: "You have successfully subscribed",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Your eamil is not valid",
        });
      }
    } else {
      res.status(201).send({ message: "You have already subscribed." });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Unsubscribe newsletter
const unsubscribeNewsLetter = asyncHandler(async (req, res) => {
  const { email } = req.params;
  console.log("req.params", req.params);
  try {
    // Check if the email exists first of all
    const checkSubscription = await NewsLetter.find({ email: email });

    // If it doesn't..
    if (checkSubscription.length > 0) {
      // Validate the subscription email
      if (validator.validate(email)) {
        const createTutorial = await NewsLetter.deleteOne({ email: email });

        res.status(201).json({
          status: "success",
          message: "You have successfully unsubscribed",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Your eamil is not valid",
        });
      }
    } else {
      res.status(201).send({ message: "Email doesn't exist" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  subscribeNewsLetter,
  unsubscribeNewsLetter,
};
