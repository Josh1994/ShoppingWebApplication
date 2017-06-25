var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";
var pg = require('pg').native;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Main Page' });
});

//POST request for login
router.post('/', function(req, res){

  var username = req.body.user;
  var pwd = req.body.password;
  console.log(req.body.user);
  console.log(req.body.password);

  console.log("Login GET user: "+username);
  console.log("Login GET pwd: "+pwd);

  pg.connect(database, function(err, client, done){
    if(err){
      throw err;
    }

    client.query("SELECT * FROM users WHERE email = '"+username+"' AND password = '"+pwd+"';",
    function(error, result){
      if(error){
        done();
        res.render('error', { message: "Login error",
                              error:error });
      }
      else if(result.rowCount==0){
        done();
        res.send("Username and password do not match. Please try again. ");
      }
      else {
        console.log(result);
        done();
        // (view, [locals], callback)
        res.render('/', { title: 'Main Page',
                              user: result[0].email });
      }
    });
  });
});

module.exports = router;
