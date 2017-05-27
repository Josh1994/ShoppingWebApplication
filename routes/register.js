var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register Page' });
});

module.exports = router;
