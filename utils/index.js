const bcrypt = require("bcryptjs");
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
const config = require('../config/index');


// Authentication
const comparePassword = (candidatePassword, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  };

  //Date formatter with momentjs
const formatDate = date => {
  return moment(date, 'YYYY/MM/DD');
}

//Sendgrid emailer
const sendReminder = () => {
sgMail.setApiKey(config.SENDGRID_API_KEY);
const msg = {
  to: 'bukolaj2018@gmail.com',
  from: 'noreply@contactsmanager.com',
  subject: 'Birthday',
  text: `and easy to do anywhere, even with Node.js ${moment().unix()}`,
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
}




  module.exports = {
      comparePassword, formatDate, sendReminder
  }