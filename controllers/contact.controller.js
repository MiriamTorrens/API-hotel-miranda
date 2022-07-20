require("../db");
const Contact = require("../models/Contact");

exports.contactList = async (req, res) => {
  const contacts = await Contact.find();
  return res.json(contacts);
};
exports.addContact = (req, res) => {
  contact.push(req.body);
  return res.json({ success: true, message: "Contact successfully added" });
};
exports.getContact = async (req, res) => {
  const contactMessage = await Contact.findOne({ _id: req.params.id });
  return !contactMessage
    ? res.status(404).json({ success: false, message: "Contact not found" })
    : res.json(contactMessage);
};
exports.deleteContact = async (req, res) => {
  const contactMessage = await Contact.findOneAndDelete({ _id: req.params.id });
  return !contactMessage
    ? res.status(404).json({ success: false, message: "Contact not found" })
    : res.json({ success: true, message: "Contact successfully deleted" });
};
exports.updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id },
    {
      contact_name: req.body.contact_name,
      contact_email: req.body.contact_email,
      contact_phone: req.body.contact_phone,
      contact_date: req.body.contact_date,
      subject: req.body.subject,
      comment: req.body.comment,
      viewed: req.body.viewed,
      archived: req.body.archived,
    }
  );
  return !contact
    ? res.status(404).json({ success: false, message: "Contact not found" })
    : res.json({ success: true, message: "Contact successfully updated" });
};
