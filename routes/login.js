var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";
var pg = require('pg').native;

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

//POST request for register
router.post('/', function(req, res, done){
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.psw;
  var repeat = req.body.pswrepeat;
  console.log(req.body.email);
  console.log(req.body.psw);
  console.log(req.body.pswrepeat);

  if(password != repeat){
      console.log("Passwords do not match");
      res.redirect('/register');

  }
  else{
    console.log("Password and repeat match")
    pg.connect(database, function(err, client, done){
      if(err){
        throw err;
      }
      client.query("insert into users(email, password, userRole) select '"+email+"','"+password+"','member';"

      ,function(error, result){
        if(error){
          done();
          res.render('error', { message: 'User Registration error',
                                error: error });
        } else {
          done();
          req.session.user = user;
          res.render('login', { title: 'Login Page' });
        }
      });
    });
  }

});

module.exports = router;
