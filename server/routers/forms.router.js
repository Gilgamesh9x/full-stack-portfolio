const { httpAddForm, httpGetAllForms } = require("./forms.controller");
const express = require("express");
const formsRouter = express.Router();

formsRouter.post("/submit-form", httpAddForm);
formsRouter.get("/forms", checkLoggedIn, httpGetAllForms);

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

// Check logged in

module.exports = formsRouter;
