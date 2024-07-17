const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const formsRouter = require("./routers/forms.router");
const adminRouter = require("./routers/admin.router");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");

// Hashing

const password = process.env.ADMIN_PASSWORD; // The password to hash
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) throw err;
});

// Admin credentials
const admin = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD_HASH,
};

// Cookies keys
const COOKIE_KEY_1 = process.env.COOKIE_KEY_1;
const COOKIE_KEY_2 = process.env.COOKIE_KEY_2;

// Passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    if (
      username === admin.username &&
      bcrypt.compare(password, admin.password) // the admin.password wil check if the hash is simlilar to the value of the password
    ) {
      return done(null, admin); // Return the admin object
    } else {
      return done(null, false, { message: "Invalid credentials" });
    }
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  if (username === admin.username) {
    done(null, admin); // Return the admin object
  } else {
    done(null, false);
  }
});

// Middleware setup
const app = express();
app.use(
  cookieSession({
    name: "session",
    keys: [COOKIE_KEY_1, COOKIE_KEY_2],
    maxAge: 25 * 60 * 60 * 1000,
  })
);

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:8000"], // Allow connections to localhost
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars as the view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
// Middleware to serve static files
app.use("/site", express.static(path.join(__dirname, "public")));
// Routes
app.use("/admin", adminRouter);
app.use("/", formsRouter);
// Catch-all route for the root path
app.use("/", (req, res) => {
  res.render("index");
});

// Error handling middleware for 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({
    error: "This link does not exist.",
  });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong.",
  });
});

module.exports = app;
