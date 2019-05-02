var db = require("../models");
var passport = require('passport');

module.exports = function(app) {
  function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
  }

  app.get('/logout',function(req, res) {
  
    req.session.destroy(function(err) {

        res.redirect('/signin');

    });

  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',
      failureRedirect: '/signin'
    }
  ));

  app.get('/dashboard', isLoggedIn, function(req, res) {
    res.render("dashboard", { username: req.user.username, money: req.user.money });
  });

  app.post('/signup', passport.authenticate('local-signup', 
    {
      successRedirect: '/dashboard',
      failureRedirect: '/signup'
    }
  ));
};
