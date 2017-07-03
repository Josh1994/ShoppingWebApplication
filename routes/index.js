var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";
var pg = require('pg').native;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set({
    'Cache-Control': 'public',
    'Pragma': 'public',
    'Expires': '3600'
  });
  res.set('etag', 'A good etag');
  res.render('index', { title: 'Main Page' , cookie:req.cookies.user_id});

});

//POST request for login
router.post('/', function(req, res){

  var username = req.body.user;
  var pwd = req.body.password;

  console.log("Login GET user: "+username);
  console.log("Login GET pwd: "+pwd);

  pg.connect(database, function(err, client, done){
    if(err){
      throw err;
    }

    //client.query("SELECT * FROM users WHERE email = '"+username+"' AND password = '"+pwd+"';",
    client.query("SELECT * FROM users WHERE email = '"+username+"' AND password = crypt('"+pwd+"', password);",

    function(error, result){
      if(error){
        done();
        res.render('error', { message: "Login error",
                              error:error });
      }
      else if(result.rowCount==0){
        done();
        res.send("Wrong username / password");
      }
      else {
        done();
        console.log(result.rows[0].id);
        //req.session.user = user;
        var id = result.rows[0].id;
        res.cookie('user_id',id, {maxAge : 99999999 });
        console.log(req.cookies.user_id);
        res.render('search', { title: 'Search Page', cookie:req.cookies.user_id });
        /* Not currently working, giving error : Cannot read property 'email' of undefined
        res.render('/', { title: 'Main Page',
                              user: result[0].email });
                              */
      }
    });
  });
});

module.exports = router;
