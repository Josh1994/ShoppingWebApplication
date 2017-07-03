var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";
var pg = require('pg').native;
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var details ='clientID': '180522997237-36mu335ur19lqkp4sgtd7rec7bdprkfv.apps.googleusercontent.com',
//     'clientSecret': '2CZ5TpvrcRq5SsFG333H9BXD',
//     'callbackURL': 'http://localhost:3000/auth/google/callback';
/* GET home page. */
router.get('/google', passport.authenticate('google',{scope: ['profile', 'email']}));

router.get('google/callback', 
    passport.authenticate('google', { successRedirect: '/search',
failureRedirect: '/' }));

router.get('/', function(req,res){ 
  passport.use(new GoogleStrategy({
      clientID: '180522997237-36mu335ur19lqkp4sgtd7rec7bdprkfv.apps.googleusercontent.com',
      clientSecret: '2CZ5TpvrcRq5SsFG333H9BXD',
      callbackURL:'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("REEEEEEEEEEEEEEEE");
        console.log(profile);
      }

  ));
});

module.exports = router;