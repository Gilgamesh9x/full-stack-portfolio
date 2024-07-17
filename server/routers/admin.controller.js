const path = require("path");

function httpsAdminDashboard(req, res) {
  return res.render("admin-dashboard");
}

function httpsAdminLogin(req, res) {
  return res.render("admin-login");
}
function httpsFailed(req, res) {
  return res.json("Failed to connect");
}

module.exports = {
  httpsAdminDashboard,
  httpsFailed,
  httpsAdminLogin,
};
