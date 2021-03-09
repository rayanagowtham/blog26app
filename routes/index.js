var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.redirect("/blogs"); 
});

router.get("/register", function(req, res){
    res.render("auth/register"); 
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
		if(err){
				req.flash("error", err.message);
				return res.redirect("/register");
		}                 
		passport.authenticate("local")(req, res, function(){
				req.flash("success", "Welcome to Blogstack");
				res.redirect("/blogs");
		});
    });
});

router.get("/login", function(req, res){
    res.render("auth/login"); 
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/blogs",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome , " + req.body.username + "!"
    })(req, res);
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Succesfully logged out");
    res.redirect("/blogs");
});

module.exports = router;
