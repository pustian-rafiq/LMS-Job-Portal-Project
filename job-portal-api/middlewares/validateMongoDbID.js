const mongoose = require("mongoose");

const validateMongoDbID = (id) => {
  const isVaid = mongoose.Types.ObjectId.isValid(id);
  if (!isVaid) throw new Error("Invalid MongoDB ID");
};

module.exports = validateMongoDbID;
