const path = require("path");

function httpsAdminLogin(req, res) {
  return res.render("admin-login");
}

function httpsFailed(req, res) {
  return res.json("Failed to connect");
}

function httpsAdminDashboard(req, res) {
  return res.render("admin-dashboard");
}

function httpsAdminForms(req, res) {
  return res.render("forms");
}

function httpsLogOut(req, res) {
  req.logout(); // remove "req.user" and clears any logged in session
  return res.redirect("/admin");
}

module.exports = {
  httpsAdminDashboard,
  httpsFailed,
  httpsAdminLogin,
  httpsAdminForms,
  httpsLogOut,
};
