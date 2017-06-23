var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";
var pg = require('pg').native;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register Page' });
});



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.post('/', function(req, res, next) {
		var email = req.body.email;
		var password = req.body.psw;
		var repeat = req.body.psw-repeat;
		console.log(req.body.email);
		console.log(req.body.psw);
		console.log(req.body.psw-repeat);
		pg.connect(database, function(err, client, done){
			if(err){
				throw err;			
			}
			client.query("insert into users(email, password, userRole) select '"+email+"','"+password+"','member';"

			,function(error, result){
				if(error){
					res.status(500).send("Email already exists");
					done();				
				} else {
					done();
					
				}
			});
		});
		
		
});
	


module.exports = router;
