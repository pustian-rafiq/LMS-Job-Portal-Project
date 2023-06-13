const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const PORT = !process.env.PORT || 5000;
const dbConnect = require("./config/dbConnect");
const { notFound, handleError } = require("./middlewares/errorhandler");
const userRouter = require("./routes/userRoutes");

dbConnect();

// Use middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome from LMS Job Portal");
});

// Declare routes
app.use("/api/auth", userRouter);

// Error handler
app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
