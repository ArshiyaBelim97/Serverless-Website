var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Handlebars = require('handlebars');
var expressHbs = require('express-handlebars')
var mongoose = require('mongoose');
require('./config/passport');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);


var index = require('./routes/index');
var users = require('./routes/users');



var uri = "mongodb://shailendra:shailendra@bookshop-shard-00-01-7uhtu.mongodb.net:27017,bookshop-shard-00-00-7uhtu.mongodb.net:27017,bookshop-shard-00-02-7uhtu.mongodb.net:27017/ecommerce?ssl=true&replicaSet=bookshop-shard-0&authSource=admin";


process.on('unhandledRejection', error => {

  console.log('unhandledRejection', error.message);
}); 
mongoose.connect(uri , function(err, db) {
 
});


var app = express();

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout', extname: '.hbs' , partialsDir: __dirname + '/views/partials/'}) );
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});


Handlebars.registerHelper('ge', function( a, b ){
  var next =  arguments[arguments.length-1];
  return (a >= b) ? next.fn(this) : next.inverse(this);
});


Handlebars.registerHelper('gt', function( a, b ){
  var next =  arguments[arguments.length-1];
  return (a > b) ? next.fn(this) : next.inverse(this);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(validator());
app.use(cookieParser());


app.use(session({ 
	secret:'september' , 
	resave : false, 
	saveUninitialized:false,
  store : new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180*60*1000} 
	 }));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next)
{
res.locals.login = req.isAuthenticated();
res.locals.session = req.session;
res.locals.pageNo = 1;
if(req.isAuthenticated())
{
  res.locals.name = req.user.name;
}

next();

});


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



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
