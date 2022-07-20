require("../db");
const Contact = require("../models/Contact");

exports.contactList = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.addContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    return res.json({ success: true, message: "Contact successfully added" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contactMessage = await Contact.findOne({ _id: req.params.id });
    return !contactMessage
      ? res.status(404).json({ success: false, message: "Contact not found" })
      : res.json(contactMessage);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contactMessage = await Contact.findOneAndDelete({
      _id: req.params.id,
    });
    return !contactMessage
      ? res.status(404).json({ success: false, message: "Contact not found" })
      : res.json({ success: true, message: "Contact successfully deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
