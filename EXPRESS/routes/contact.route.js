const express = require("express");
const routerContact = express.Router();
const contact = require("../controllers/contact.controller");

routerContact.route("/").get(contact.contactList).post(contact.addContact);
routerContact
  .route("/:id")
  .get(contact.getContact)
  .patch(contact.updateContact)
  .delete(contact.deleteContact);

module.exports = routerContact;
