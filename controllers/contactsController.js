const User = require('../models/users');
const Contact = require('../models/contacts');
const {sendEmail} = require('../middleware/index');


 class ContactsController{
    static async getAllContacts (req, res){
        try{
            const user = await User.findOne({email: req.body.authorisedUser});
            const contacts = await Contact.find({userId: user._id}).populate("userId", "email");
            console.log("Contacts:", user.email);
            res.status(200).json({payload: contacts});
            }catch(err){
              res.status(500).json({error: `${err}`, message: "Can't load contacts"});
            }
    }

    static async getContactById (req, res){
        try{
            const user = await User.findOne({email: req.body.authorisedUser})
            const contact = await Contact.findOne({userId: user._id, _id: req.params.id}).populate("userId", "email");
            console.log("Contacts:", contact)
            res.status(200).json({payload: contact});
            }catch(err){
                res.status(404).json({error: `${err}`, message: "Can't find contact"});
            }
    }

    static async addNewContact (req, res){
        try{
            //find user with token
            const user = await User.findOne({
                email: req.body.authorisedUser
            });
           
            //TODO <-----put checks in place to check contact doesn't already exist
            //      -----!name && onePersonalEmail don't already exist
            //birthday logic here
            let contact;
            if(req.body.birthday){
                const DOB = new Date(req.body.birthday)//, "YYYY-MM-DD"); //YYYY-MM-DD
                contact = new Contact({userId: user._id, birthday: DOB, ...req.body});
            }else{
            contact = new Contact({userId: user._id, ...req.body});
            }await contact.save();
             res.status(201).json({Contact: `${contact}`, message: "New contact created"});
            // }
        }catch(err){
            res.status(500).json({error: `${err}`, message: "Error saving contact"});
        }    
    }

    static async updateNameDOB (req, res){
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });
    
            //let DOB;
            let contact;
        if(req.body.birthday){
            const DOB = new Date(req.body.birthday)//, "YYYY/MM/DD"); //date inconsistency for certain months, e.g October becomes September based on the API numbering
            console.log("Entered birthday: ", req.body.birthday)
            console.log("Formatted bday: ", DOB)
            contact = await Contact.findOneAndUpdate({userId: user._id, _id:req.params.id}, {birthday: DOB,...req.body}, {new: true});
        }else{
            //find contact with userId and contact params
            contact = await Contact.findOneAndUpdate({userId: user._id, _id:req.params.id}, {...req.body}, {new: true});
        }console.log("Updated contact: ", contact);
            res.status(200).json({success: true, message: "Contact updated", contact: contact})
        }catch(err){
            console.log("Error message: ", err)
        res.status(500).json({error: err, message: "Error making changes to contact"});
        }   
    }

    static async updateOneEmail (req, res){
        const {contactid, emailid} = req.params;
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });
            
            const email = await Contact.findOneAndUpdate({userId: user._id, _id: contactid, emails: {$elemMatch: {_id: emailid}}}, {$set: {'emails.$.email': req.body.email}}, {new : true});
            res.status(200).json({success: true, message: "Contact updated", contact: `${email}`})
        }catch(err){
            console.log("Error message: ", err)
            res.status(500).json({error: `${err}`, message: "Error adding new number to contact"});
        }    
    }

    static async addNewEmail (req, res){
        const {contactid} = req.params;
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });
            
            const contact = await Contact.findOneAndUpdate({userId: user._id, _id: contactid}, {$push: {'emails': req.body.email}}, {new : true});
            res.status(200).json({success: true, message: "Contact updated", contact: `${contact}`})
        }catch(err){
            console.log("Error message: ", err)
            res.status(500).json({error: `${err}`, message: "Error adding new email to contact"});
        }    
    }

    static async addNewPhone (req, res){
        const {contactid} = req.params;
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });
            
            const contact = await Contact.findOneAndUpdate({userId: user._id, _id: contactid}, {$push: {'phones': req.body.phone}}, {new : true});
            res.status(200).json({success: true, message: "Contact updated", contact: `${contact}`})
        }catch(err){
            console.log("Error message: ", err)
        res.status(500).json({error: `${err}`, message: "Error adding new number to contact"});
        }
    }

    static async addNewAddress (req, res){
        const {contactid} = req.params;
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });
            
            const contact = await Contact.findOneAndUpdate({userId: user._id, _id: contactid}, {$push: {'addresses': req.body.address}}, {new : true});
            res.status(200).json({success: true, message: "Contact updated", contact: `${contact}`})
        }catch(err){
            console.log("Error message: ", err)
        res.status(500).json({error: `${err}`, message: "Error adding new address to contact"});
        }    
    }

    static async updateEmails (req, res){
        const {contactid} = req.params;
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });

            const contact = await Contact.findOne({userId: user._id, _id: contactid});
            const emails = Object.keys(req.body.emails);
            emails.forEach(email => {
                contact.emails[email] = req.body.emails[email];
                console.log("email: ", contact.emails[email])
            })
            const updatedContact = await contact.save();
            
            res.status(200).json({success: true, contact: `${updatedContact}`})
        }catch(err){
            console.log("Error message: ", err)
        res.status(500).json({error: err, message: "Error adding new number to contact"});
        }    
    }

    static async updatePhones (req, res){
        const {contactid} = req.params;
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });

            const contact = await Contact.findOne({userId: user._id, _id: contactid});
            const phones = Object.keys(req.body.phones);
            phones.forEach(phone => {
                contact.phones[phone] = req.body.phones[phone];
                console.log("phone: ", contact.phones[phone])
            })
            const updatedContact = await contact.save();
            
            res.status(200).json({success: true, contact: `${updatedContact}`})
        }catch(err){
            console.log("Error message: ", err)
        res.status(500).json({error: err, message: "Error adding new number to contact"});
        }    
    }

    static async updateAddresses (req, res){
        const {contactid} = req.params;
        try{
            //find user with token data
            const user = await User.findOne({
                email: req.body.authorisedUser
            });

            const contact = await Contact.findOne({userId: user._id, _id: contactid});
            const addresses = Object.keys(req.body.addresses);
            addresses.forEach(address => {
                contact.addresses[address] = req.body.addresses[address];
                console.log("address: ", contact.addresses[address])
            })
            const updatedContact = await contact.save();
            
            res.status(200).json({success: true, contact: `${updatedContact}`})
        }catch(err){
            console.log("Error message: ", err)
        res.status(500).json({error: `${err}`, message: "Error adding new address to contact"});
        }   
    }
 }

module.exports ={ContactsController};