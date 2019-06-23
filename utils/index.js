const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require('moment');

// Authentication
const comparePassword = (candidatePassword, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  };

  const formatDate = date => {
    return moment(date, 'YYYY/MM/DD');
  }



  module.exports = {
      comparePassword, formatDate
  }