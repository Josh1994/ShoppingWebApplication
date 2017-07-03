// website: https://hatshop.herokuapp.com/

/* ------------------------------ Modules ------------------------------ */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var sslRedirect = require('heroku-ssl-redirect');

var index = require('./routes/index');
var register = require('./routes/register');
var search = require('./routes/search');
var login = require('./routes/login');
var cart = require('./routes/cart');

// Used for OAuth
var url = require('url');
var google = require('googleapis');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// Used for cookies/sessions
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');


/* ---------------- Google Identity (OAuth 2.0) Constants ------------------ */

const CLIENT_ID = "184838967778-thvc3v3r33phl17u998tr17fp9120bov.apps.googleusercontent.com";
const CLIENT_SECRET = "EyqiXzYTcxwxoejP3z1CD3tK";
const TOKEN_SECRET = 'be08ue1e1ne1d1';

var port = process.env.PORT || 3000;

/* -------------------------------- Middleware -------------------------------- */
var app = express();
app.use(express.static('views'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'fjakfjb21e1',
                saveUninitialized: true,
                resave: true  }));

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/javascripts', express.static(__dirname + 'node_modules/bootstrap/dist/js')); // Bootstrap JS connection after npm install
//app.use('/javascripts',express.static(path.join(__dirname + 'node_modules/jquery/dist'))); // JQuery connection after npm install
//app.use('/stylesheets',express.static(__dirname + 'node_modules/bootstrap/dist/css')); // CSS bootstrap connection after npm install

app.use('/', index);
app.use('/register', register);
app.use('/search', search);
app.use('/login', login);
app.use('/cart', cart);

/* ------------------------ Start of Google Middleware --------------------------*/

var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://localhost:3000/oauthcallback"
);

// Generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = ['https://www.googleapis.com/auth/gmail.modify'];


var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

/* ------------------------- End of Google Middleware ----------------------  */


/* ------------------------------- RESTFUL API -----------------------------  */
/* This is currently giving errors with the OAuth, even though there isn't anything wrong.
Will need to work on a new implementation of the below error handler. */


app.use(sslRedirect());

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
  res.send(url);
});

app.get("/oauthcallback", function(req, res) {
  var code = req.query.code;
  console.log("Code: " +code);
  oauth2Client.getToken(code, function(err, tokens){
    if(!err) {
      console.log(tokens);
      oauth2Client.setCredentials(tokens);
    } else {
      console.log(err)
      res.status(400).json();
    }
  });
  plus.people.get({userId: 'me', auth: oauth2Client}, function(error, profile){
    console.log("Google Authentication Successful.");
    res.render('searchLoggedIn', { title: 'Welcome to Hat Shop', cookie:req.cookies.user_id });
    /*
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully'
      res.render('cart', { title: 'Cart', cookie:req.cookies.user_id });
    });
    */
  });
});



/* Implements Adrian's code link  mentioned in the email. Forces communication with
the web server to HTTPS only */
app.use(function(req, res, next){
  if (req.headers['x-forwarded-proto'] !== 'https') {
    var httpsVersion = [
      'https://hatshop.herokuapp.com',
      req.url].join('');
    return res.redirect(httpsVersion);
  }else{
    return next();
  }
});

/* Prints the cookies in console for reference */
app.use('/', function(req, res){
  console.log('========================');
  console.log('cookies')
  console.log(req.cookies);
  console.log('========================')
  console.log('session')
  console.log(req.session);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
