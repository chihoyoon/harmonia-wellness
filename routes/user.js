var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();

router.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/signup", function (req, res) {
  res.render("signup")
});

router.post("/signup", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;  
  User.findOne({username:username}, function (err, user){
    if (err) {return next(err);}
    if (user) {
      req.flash ("err", "That username is taken. Try another.")
      return res.redirect("/signup");
    } else {
      var newUser = new User({
      username: username,
      password: password,      
    });
    newUser.save();
    console.log(newUser);
    }     
  });
},passport.authenticate("local", {
  successRedirect: "/:username",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get("/:username",function(req,res,next){
  User.findOne({username:req.params.username},function(err,user){
    if(err) {return next(err);}
    if(!user){return next(404);}
    res.render("welcom",{user:user});
  });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/:username",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("../");
});

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    req.flash("info","You must login before you can view this page.");
    res.redirect("/login");
  }
};

router.get("/edit",ensureAuthenticated,function(req,res){
  res.render("edit");
});

router.post("/edit",ensureAuthenticated,function(req,res,next){
  req.user.password = req.body.password;
  req.user.phonenumber = req.body.phonenumber;
  req.user.email = req.body.email;
  req.user.save(function(err){
    if(err){next(err);return;}
    req.flash("info","Profile updated!");
    res.redirect("/edit");
  });
});


module.exports = router;
