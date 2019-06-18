'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/users');

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const user = await User.find({});
  res.status(200).json({payload: `${user}`});
});

/**POST /users  ---create new user */
router.post('/', async(req, res, next) => {
  try{
  const user = await User.findOne({email: req.body.email});
  if(user){
    res.status(400).json({error: "This email has already been registered"});
  }
  else{
    const user = new User({email: req.body.email, password: req.body.password});
    user.save();
    return res.status(201).json({message: "New user created."})
  }
}catch(err){
  res.status(500).json({ error: `${err}`, message: "Can't create new user. Something went wrong!" });
}

})

module.exports = router;
