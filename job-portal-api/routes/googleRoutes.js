const googleRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");

googleRouter.get(
  "/login/success",
  asyncHandler(async (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Login succesfully",
    });
  })
);

googleRouter.get(
  "/login/failed",
  asyncHandler(async (req, res) => {
    res.status(200).json({
      status: "Failed",
      message: "Login Failed",
    });
  })
);
googleRouter.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);
googleRouter.get(
  "/auth/google/callback",

  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

googleRouter.get(
  "/logout",
  asyncHandler(async (req, res) => {
    req.logOut();
    res.redirect("/");
  })
);

module.exports = googleRouter;
