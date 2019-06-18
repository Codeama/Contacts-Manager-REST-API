'use strict';

const mongoose = require('mongoose');



const phoneSchema = new mongoose.Schema({
    description: String,
    number: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

const addressSchema = new mongoose.Schema({
    description: String,
    street: String, 
    city: String, 
    county: String, 
    postCode: String, 
    country: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const emailSchema = new mongoose.Schema({
    description: String,
    email: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const contactSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    birthday: Date,
    addresses: [addressSchema],
    phones: [phoneSchema],
    emails: [emailSchema]
})



module.exports = mongoose.model("Contact", contactSchema);