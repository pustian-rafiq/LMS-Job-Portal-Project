const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = !process.env.PORT || 5000;
const dbConnect = require("./config/dbConnect");

dbConnect();

app.get("/", (req, res) => {
  res.send("Welcome from LMS Job Portal");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
