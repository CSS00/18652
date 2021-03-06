var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var add = require('./routes/add');

var app = express();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ChatRoomApp.db');

// db initialization
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='messages'",
       function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "messages" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"name" VARCHAR(255), ' +
           '"text" VARCHAR(255), ' +
           '"timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP)', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'messages' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'messages' already initialized.");
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// maxAge = 10min
app.use(session({ secret: 'app', cookie: { maxAge: 600000 }}));
var verifyUser = function(req, res, next) {
    if(req.session.loggedIn) {
        next(); 
    } else {
        if(req.body.username != null) {
          req.session.name = req.body.username;
          req.session.loggedIn = true;

          app.locals.name = req.body.username;
          res.locals.name = app.locals.name;
          res.redirect('/');
        } else {
          res.render("login", {title: "Please log in."});
        }
    }   
}
app.use('/', verifyUser, routes);

// app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/add', add);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
