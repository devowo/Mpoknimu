const express = require("express");
const router = express.Router();
const Joi = require("joi");
const User = require("../models/user.js");
const passport = require("passport");

const userSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .regex(/^[a-zA-Z0-9]{4,12}$/)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // GOOD
    return next();
  } else {
    req.flash("error", "Sorry, but you must be registered first!");
    res.redirect("/");
  }
};
// Revisar esta parte 
/* const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // GOOD
    return next();
    req.flash("error", "Sorry, but you are already logged in!");
  } else {
    res.redirect("/");
  }
}; */

router
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post(async (req, res, next) => {
    try {
      const result = Joi.validate(req.body, userSchema);
      //console.log("result", result);
      if (result.error) {
        req.flash("error", "Data is not valid. Please try again.");
        res.redirect("/users/register");
        return;
      }
      // Check email
      const user = await User.findOne({ email: result.value.email });
      if (user) {
        req.flash("error", "Email is already in use.");
        res.redirect("/users/register");
        return;
      }
      // Hash the password
      const hash = await User.hashPassword(result.value.password);
      //console.log('hash', hash);

      // Save to DB
      delete result.value.confirmPassword;
      // Override the password with the hash
      result.value.password = hash;
      //console.log('new values', result.value);

      const newUser = await new User(result.value);
      console.log("newUser", newUser);
      await newUser.save();

      req.flash("success", "You may now login.");
      res.redirect("/users/login");
      return;
    } catch (error) {
      next(error);
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
    })
  );

router.route("/dashboard").get(isAuthenticated, (req, res) => {
  res.render("dashboard", {
    username: req.user.username
  });
});

router.route("/logout").get(isAuthenticated,(req, res) => {
  req.logout();
  req.flash("success", "Successfully logged out, Hope to see you soon!");
  res.redirect("/");
});

module.exports = router;
