const bcrypt = require("bcryptjs");
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
const config = require('../config/index');
const Contacts = require('../models/contacts');


// Authentication
function comparePassword(candidatePassword, password){
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  };

  //Date formatter with momentjs
function formatDate(date){
  return moment(date, 'YYYY/MM/DD');
}

function isToday(date){
  const isSameDay = moment().format('D') === moment(date).format('D');
  const isSameMonth = moment().format('M') === moment(date).format('M');
  return isSameDay && isSameMonth;
}

//finds contacts and show (populate) owners
//grab birthdays and check if it is today, if so send birthday reminder to owner
async function checkBirthday(){
  const contacts = await Contacts.find({}, 'name birthday').populate('userId');
  contacts.map(b => console.log(`${moment(b.birthday)}`));
  contacts.filter(contact => isToday(contact.birthday)).forEach(contact => sendReminder(contact.userId.email, contact.name));
}

//Sendgrid emailer
function sendReminder(recipient, contactName){
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
      comparePassword, formatDate, checkBirthday, sendReminder
  }