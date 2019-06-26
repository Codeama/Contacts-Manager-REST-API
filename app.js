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
const {sendReminder} = require('./utils/index');
const Users = require('./models/users');
const Contacts = require('./models/contacts');
const moment = require('moment')


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

//finds contacts and show (populate) owners
//grab birthdays and check if it is today, if so send birthday reminder to owner
 async function checkBirthday(){
  const contacts = await Contacts.find({}, 'name birthday').populate('userId')//.then(contacts => console.log(`Contacts: ${contacts}`));
  contacts.map(b => console.log(`${moment(b.birthday)}`));
  contacts.filter(contact => isToday(contact.birthday)).forEach(contact => sendReminder(contact.userId.email, contact.name));
  // console.log(`Birthdays today: ${birthdays}`) //${checkedDate[0].userId.email}`)
  //send message to owners
  //birthdays.forEach
}
checkBirthday();

function isToday(date){
  const isSameDay = moment().format('D') === moment(date).format('D');
  const isSameMonth = moment().format('M') === moment(date).format('M');
  return isSameDay && isSameMonth;
}




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
