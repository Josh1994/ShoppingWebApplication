var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";
var pg = require('pg').native;

router.get('/', function(req, res, next) {
  res.render('cart', 
              { title: 'cart Page'
                 });
});

//AJAX response for when user press the Add to Cart button
router.post('/:item', function(req, res, next){
  console.log("Cart req.param: "+req.body.itemBought); // Returns value of itemBought.
  var userId = 88; //Will be changed once cookie is implemented TODO
  var itemBought = req.body.itemBought;

  pg.connect(database, function(err, client, done){
    if(err){
      throw err;
    }
    client.query("insert into useritems (users, itemsincart) values("+userId+",'"+itemBought+"');", function(err, result){
      if(err){ //Empty results
       res.status(500).send("Product cannot be added to the cart");
       done();
      }
      else{
        done();
        res.send( 
          { message: 'Item added to cart' });
      }
    });
  });
});

module.exports = router;