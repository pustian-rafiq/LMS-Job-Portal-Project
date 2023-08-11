const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const PORT = !process.env.PORT || 5000;
const dbConnect = require("./config/dbConnect");
const { notFound, handleError } = require("./middlewares/errorhandler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tutorialCatRoutes = require("./routes/tutorialCategoryRoutes");
const tutorialRoutes = require("./routes/tutorialRoutes");
const newsLetterRoutes = require("./routes/newsLetterRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const videoRoutes = require("./routes/videoRoutes");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const googleRouter = require("./routes/googleRoutes");
const passportSetup = require("./utils/passport");

dbConnect();

// Use Session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Use middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Welcome from LMS Job Portal");
// });
app.get("/", (req, res) => {
  res.send(`<a href='http://localhost:5000/google'>Login With Google</a>`);
});
// Declare routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tutorial/categories", tutorialCatRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/news-letter", newsLetterRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/videos", videoRoutes);
app.use("/", googleRouter);

// Error handler
app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
