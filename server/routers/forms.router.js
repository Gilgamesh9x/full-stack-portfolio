const { httpAddForm, httpGetAllForms } = require("./forms.controller");
const express = require("express");

const formsRouter = express.Router();

formsRouter.post("/submit-form", httpAddForm);
formsRouter.get("/forms", httpGetAllForms);

module.exports = formsRouter;
