const contact = require("../data/contact.json");

exports.contactList = (req, res) => {
  return res.json(contact);
};
exports.addContact = (req, res) => {
  contact.push(req.body);
  return res.json({ success: true, message: "Contact successfully added" });
};
exports.getContact = (req, res) => {
  const contactMessage = contact.find((c) => c.id === req.params.id);
  return !contactMessage
    ? res.status(404).json({ success: false, message: "Contact not found" })
    : res.json(contactMessage);
};
exports.deleteContact = (req, res) => {
  const index = contact.findIndex((c) => c.id === req.params.id);
  contact.splice(index, 1);
  return index < 0
    ? res.status(404).json({ success: false, message: "Contact not found" })
    : res.json({ sucess: true, message: "Contact successfully deleted" });
};
exports.updateContact = (req, res) => {
  contact.forEach((contact, index) => {
    if (contact.id === req.params.id) {
      contact = contact[index];
      return !contact[index]
        ? res.status(404).json({ success: false, message: "Contact not found" })
        : (contact[index] = req.body);
    }
  });
  return res.json({ success: true, message: "Contact successfully updated" });
};
