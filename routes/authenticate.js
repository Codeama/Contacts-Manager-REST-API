const express = require("express");
const router = express.Router();
const config = require('../config');
const jwt = require("jsonwebtoken");
const {comparePassword} = require('../utils');
const User = require('../models/users')
const JWT_SECRET = config.JWT_SECRET;


/**POST /authenticate */
router.post("/", async(req, res, next)=> {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.json({success: false, message: "Username/password invalid"}); 
        }

        const match = await comparePassword(req.body.password, user.password);
        if(match){
            const {email} = user;
            const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + 1209600, email}, JWT_SECRET);
            return res.status(200).json({success: true, message: "Authentication successful", token})
        }

        return res.status(401).json({
            success: false,
            message: "Login unsuccessful, passwords do not match"
        })
    }catch(err){
        return res.status(500).json({error: `${err}`})
    }
})

module.exports = router;

