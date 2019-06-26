require ('newrelic');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const config = require('./config');
const {validateUser} = require('./middleware/index');
const {checkBirthday} = require('./utils/index')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticateRouter = require('./routes/authenticate');
var contactsRouter = require('./routes/contacts');

var app = express();



//connection
mongoose.connect(`${config.MONGO_URL}`, {useNewUrlParser: true,
  useFindAndModify: false}).catch(err => console.log("error:", err));

  //check config
console.log("Config:", config)



checkBirthday();






app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authenticate', authenticateRouter);
app.use('/contacts', validateUser, contactsRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;
