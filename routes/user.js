var express = require("express");
var passport = require("passport");
const { db } = require("../models/user");
var User = require("../models/user");
var router = express.Router();

router.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


router.get("/", (req, res) => {
  if (req.session.Logined) {
    res.render("admin");
  } else {
    res.redirect("../");
  }
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up")
});

router.post("/sign-up", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var phonenumber = req.body.phonenumber;
  var email = req.body.email;
  user.findOne({username:username}, function (err, user){
    if (err) {return next(err);}
    if (user) {
      req.flash ("err", "That username is taken. Try another.")
      return res.redirect("/sign-up");
    }
    var newUser = new user({
      username: username,
      password: password,
      phonenumber: phonenumber,
      email: email
    });
  },passport.authenticate("login", {
    successRedirect: "/user-info",
    failureRedirect: "/sign-up",
    failureFlash: true
  })
  );  
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/user-info",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("../");
});

router.get("/user-info", function (req, res, next) {
  res.render("/user-info")
});

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    req.flash("info","You must login before you can view this page.");
    res.redirect("/login");
  }
};

router.get("/user-info",ensureAuthenticated,function(req,res){
  res.render("user-info");
});

router.post("/user-info",ensureAuthenticated,function(req,res,next){
  req.user.password = req.body.password;
  req.user.phonenumber = req.body.phonenumber;
  req.user.email = req.body.email;
  req.user.save(function(err){
    if(err){next(err);return;}
    req.flash("info","Profile updated!");
    res.redirect("/user-info");
  });
});


module.exports = router;
