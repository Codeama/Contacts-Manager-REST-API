const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Authentication
const comparePassword = (candidatePassword, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  };



  module.exports = {
      comparePassword
  }