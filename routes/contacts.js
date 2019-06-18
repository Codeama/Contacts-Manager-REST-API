'use strict';
const express = require('express');
const router = express.Router();
const {ContactsController} = require('../controllers/contactsController')


//[GET]/contacts/:contactid  ---get a single contact
router.get('/:id', ContactsController.getContactById);

/**[GET] /contacts  ---get all contacts */
router.get('/', ContactsController.getAllContacts);

/**[POST] /contacts  ---add new contact */
router.post('/', ContactsController.addNewContact);

//[PATCH]/contacts/{contactid} --make changes to a single contact's name and/or birthday
router.patch('/:id', ContactsController.updateNameDOB);

//PATCH/contacts/{contactid}/emails/{emailid} ===edit just one email in an array
router.patch('/:contactid/emails/:emailid', ContactsController.updateOneEmail);

//[PATCH]/contacts/{contactid}/emails   *add one email to array emails*
router.patch('/:contactid/emails', ContactsController.addNewEmail);

//[PATCH]/contacts/{contactid}/phones   *add one phone to array phones*
router.patch('/:contactid/phones', ContactsController.addNewPhone);

//[PATCH]/contacts/{contactid}/addresses   *add one address to array addresses*
router.patch('/:contactid/addresses', ContactsController.addNewAddress);

//[PUT]/contacts/{contactid}/emails   *add an array of emails or overwrite existing ones*
router.put('/:contactid/emails', ContactsController.updateEmails);

//[PUT]/contacts/{contactid}/emails   *add an array of phones or overwrite existing one*
router.put('/:contactid/phones', ContactsController.updatePhones);

//[PUT]/contacts/{contactid}/emails   *add an array of addresses or overwrite existing one*
router.put('/:contactid/addresses', ContactsController.updateAddresses);




//PATCH ===add new phone number :::checkfor duplicate addition and alert client
//DELETE ===endpoint to delete contact
//DELETE ===endpoint to delete contact phone number (work || home || mobile)

module.exports = router;