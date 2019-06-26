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
const sendReminder = (recipient, contactName) => {
sgMail.setApiKey(config.SENDGRID_API_KEY);
const msg = {
  to: recipient,
  from: 'noreply@contactsmanager.com',
  subject: `It's ${contactName}'s Birthday today!!!`,
  html: '<strong>Say happy birthday to them. Share some love :-).</strong>',
};
sgMail.send(msg);
}




  module.exports = {
      comparePassword, formatDate, sendReminder
  }