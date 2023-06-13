const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb database connection successful");
  } catch (err) {
    console.error("err", err);
  }
};

module.exports = dbConnect;
