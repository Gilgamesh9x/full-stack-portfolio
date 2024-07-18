const {
  httpsFailed,
  httpsAdminDashboard,
  httpsAdminLogin,
  httpsAdminForms,
  httpsLogOut,
} = require("./admin.controller");
const passport = require("passport");
const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/", redirectUserWhenLoggedin, httpsAdminLogin);
adminRouter.get("/forms", checkLoggedIn, httpsAdminForms),
  adminRouter.get("/dashboard", checkLoggedIn, httpsAdminDashboard);
adminRouter.get("/admin-dashboard.html", checkLoggedIn, httpsAdminDashboard);
adminRouter.get("/logout", checkLoggedIn, httpsLogOut);
adminRouter.get("/failed", httpsFailed);

// Check logged in
function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  /* console.log("Current user is: ", req.user); */
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in.",
    });
  }
  next();
}

// check logged in to redirect
function redirectUserWhenLoggedin(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (isLoggedIn) {
    return res.redirect("/admin/dashboard");
  } else {
    return next();
  }
}

// Login route (this is where the credentials the user enters go to validate if the user is the real admin)

adminRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/failed",
  })
);

module.exports = adminRouter;
