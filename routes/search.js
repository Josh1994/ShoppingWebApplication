var express = require('express');
var router = express.Router();
var database = "postgres://tivngnhwlxtmkp:4f2f1fff9cc8065295ac874e18ddd8d9f322f536cc50c9aea6610ce4002d3cea@ec2-23-21-169-238.compute-1.amazonaws.com:5432/d6ns5drql89lm1";
var pg = require('pg').native;

router.get('/', function(req, res, next) {
  res.render('search', 
              { title: 'Search Page',
                url: '/search'
                 });
});

//Manual search from AJAX call
router.get('/result', function(req, res, next) {
  console.log("Search router / req.param: "+req.query.searchAnswer);
  //console.log(req.query.paramName);
  console.log(req.query);
 // done();
  var search = req.query.searchAnswer;
  var searchResults = [];
  pg.connect(database, function(err, client, done){
    if(err){
      throw err;
    }
    client.query("select * from items where name ='"+search+"';", function(err, result){
      searchResults = result.rows;
      if(searchResults.length === 0){ //Empty results
       res.status(500).send("Product name does not exist");
       done();
      }
      else{
        //TODO
        console.log(searchResults);
        done();
        res.send( 
          {
            searchArray:searchResults});  
        // res.send( {result: [
        //   { title: 'Search Page',
        //     searchArray:searchResults}] });  
      }
    });
  });
});

//Tag can either be a brand , style or location for now. Will be changed later given the time
router.get('/:tag', function(req, res, next) {

  var tags = req.params.tag;
  var type= req.query.e;
  console.log("Search router get tags: "+tags);
  console.log("Search router get type: "+type);
  var searchResults = [];
  pg.connect(database, function(err, client, done){
    if(err){
      throw err;
    }
    client.query("select * from items where "+tags+"='"+type+"';", function(err, result){
      if(err){
       res.status(500).send("Selection does not exist");
       done();
      }
      else{
        //TODO
        searchResults = result.rows;
        console.log(searchResults);
        done();
        res.render('search', 
          { title: 'Search Page',
            tag: type,
            itemArray:searchResults});  
      }
    });

  });

  // if (tags == "style"){
  //   // Connect to the database and do query search for the tag.
  //   type = req.query.sty;
  //   console.log(type);
  //   pg.connect(database, function(err, client, done){

  //     client.query("select from items where style='"+type"';", function(err, res){

  //     });

  //   });
});

module.exports = router;
