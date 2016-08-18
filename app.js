
/**************** APP STATUS  *********************/

process.env.NODE_ENV = 'development';

/**************** DEPENDANCIES *********************/
//npm modules
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var cons         = require('consolidate')
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

//my modules
var router      = require('./routes/api');

/**************** The app *********************/
var app = express();

/**************** FAVICON *********************/
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

/*********** VIEW RENDING *********************/
// view engine setup
// use swig engine for .html
app.engine('html', cons.swig); 
// use template engine pour les .html
app.set('view engine', 'html'); 
// dossier des vues
app.set('views', path.join(__dirname, 'views')); 
// view cache
app.set('view cache', false); // désactivation du cache express


/**************** PARSERS *********************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

/**************** ROUTES *********************/
app.use('/api', router);

/**************** ERROR HANDLING *************/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('exceptions/errors', {
      message: err.message,
      error: err + ""
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('exceptions/errors', {
    message: err.message,
    error: {}
  });
});

/*************** EXPORT APP **************/
module.exports = app;



