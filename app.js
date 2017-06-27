// website: https://hatshop.herokuapp.com/

/* ------------------------------ Modules ------------------------------ */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var register = require('./routes/register');
var search = require('./routes/search');
var login = require('./routes/login');

// Used for OAuth
// var authenticator = require('./authenticator');
var url = require('url');
var config = require('./config');
var google = require('googleapis');

/* ---------------- Google Identity (OAuth 2.0) Constants ------------------ */

// Not yet implemented.
// const TOKEN_SECRET = 'xxx'

const CLIENT_ID = "184838967778-thvc3v3r33phl17u998tr17fp9120bov.apps.googleusercontent.com";
const CLIENT_SECRET = "EyqiXzYTcxwxoejP3z1CD3tK";

var port = process.env.PORT || 8080;


/* ------------------------------ Middleware ------------------------------ */
var app = express();
app.use(express.static('views'));


/* Start of Google Middleware */
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://localhost:8080/oauthcallback"
);

// Generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/gmail.modify'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

/* End of Google Middleware */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add cookie parsing functionality to our Express app
app.use(require('cookie-parser')());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/javascripts', express.static(__dirname + 'node_modules/bootstrap/dist/js')); // Bootstrap JS connection after npm install
//app.use('/javascripts',express.static(path.join(__dirname + 'node_modules/jquery/dist'))); // JQuery connection after npm install
//app.use('/stylesheets',express.static(__dirname + 'node_modules/bootstrap/dist/css')); // CSS bootstrap connection after npm install

app.use('/', index);
app.use('/register', register);
app.use('/search', search);
app.use('/login', login);

/* This is currently giving errors with the OAuth, even though there isn't anything wrong.
Will need to work on a new implementation of the below error handler.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/* ------------------------------ OAuth - Google ------------------------------ */

//Get request that redirects to a specifically created Google address for oAuth
app.get("/url", function(req, res) {
  console.log('Redirected to specifically created google address');
  //res.cacheControl("no-cache");
  res.send(url);
});

app.get("/tokens", function(req, res) {

/*
  var code = req.query.code;
    oauth2Client.getToken(code, function(error, tokens){
      if(!error) {
        console.log(tokens);
        oauth2Client.setCredentials(tokens);
      } else {
        res.status(400).json();
      }
    });
*/

  var code = req.query.code;
  console.log('HEY! inside /tokens');
  console.log(code);

  oauth2Client.getToken(code, function(err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    console.log("YOZA!");
    console.log(err);
    console.log(tokens);
    oauth2Client.setCredentials(tokens);
    res.send(tokens);
  });
});


/* ------------------------------ OAuth - Twitter ------------------------------ */
/* This is OAuth V1.0 implemetaton using Twitter. This is probably the easiest implemetation,
Adrian said that using Twitter was fine. However, I think that using Google Identity might
be more secure, as it uses (OAuth 2.0) and offers some additional features to help with completion requirement 2.0.
Might have authentication using both Google and Twitter.


// Code to connect to our database goes here. Will likely use MongoDB, a document database rather than a relational
// database.
// {}.connect();

/* Take user to Twitter's login page. Used when the user clicks the 'Sign in using Twitter button'.
   Will generate a request token.
*/


/* app.get('/auth/twitter', authenticator.redirectToTwitterLoginPage);

// This is the callback url that the user is redirected to after signing in
app.get(url.parse(config.oauth_callback).path, function(req, res) {
	authenticator.authenticate(req, res, function(err) {
		if (err) {
			res.redirect('/login');
		} else {
			res.redirect('/');
		}
	});
}); */
