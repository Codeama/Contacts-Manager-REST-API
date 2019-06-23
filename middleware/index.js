'use strict';
const config = require('../config');
const jwt = require('jsonwebtoken')

//jwt middleware
const validateUser = (req, res, next) => {
  jwt.verify(req.headers['authorization'], config.JWT_SECRET, function(err, decoded){
    if(err){
      res.json({success: false, message: err.message, data: null})
    }else{
      req.body.authorisedUser = decoded.email;
      next();
    }
  })
}

const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const sendReminder = () => {
sgMail.setApiKey(config.SENDGRID_API_KEY);
const msg = {
  to: 'bukolaj2018@gmail.com',
  from: 'bkljimoh@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: `and easy to do anywhere, even with Node.js ${moment().unix()}`,
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  send_at: moment().add(2, 'hours').unix()
  //"send\_at": ""
};
sgMail.send(msg);
}



module.exports = {validateUser, sendReminder}