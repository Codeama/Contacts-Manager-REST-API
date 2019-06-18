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



module.exports = {validateUser}