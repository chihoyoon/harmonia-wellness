var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/credential", function (req, res, next) {
  res.render("credential");
});

router.get("/services", function (req, res, next) {
  res.render("services");
});

router.get("/testimonials", function (req, res, next) {
  res.render("testimonials");
});

router.get("/contact-us", function (req, res, next) {
  res.render("contact-us");
});

router.get("/book", function (req, res, next) {
  res.render("book");
});

module.exports = router;
