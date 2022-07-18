const Joi = require("joi");
const { connection } = require("../db");

const contactSchema = Joi.object({
  contact_name: Joi.string().max(100).required(),
  contact_email: Joi.string().email().required(),
  contact_phone: Joi.string()
    .length(11)
    .pattern(/^[0-9-]+$/)
    .required(),
  contact_date: Joi.date().required(),
  subject: Joi.string().max(500),
  comment: Joi.string(),
  viewed: Joi.number().min(0).max(1).required(),
  archived: Joi.number().min(0).max(1).required(),
});

exports.contactList = (req, res) => {
  connection.query("SELECT * FROM contact", (err, results) => {
    if (err) throw err;
    return res.json({ contact: results });
  });
};

exports.addContact = (req, res) => {
  const newContact = [
    req.body.contact_name,
    req.body.contact_email,
    req.body.contact_phone,
    req.body.contact_date,
    req.body.subject,
    req.body.comment,
    req.body.viewed,
    req.body.archived,
  ];
  const { error } = contactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  } else {
    connection.query(
      "INSERT INTO contact (contact_name, contact_email, contact_phone, contact_date, subject, comment, viewed, archived) VALUES (?)",
      [newContact],
      (err, results) => {
        if (err) throw err;
        return res.json({
          success: true,
          message: "Contact successfully added",
        });
      }
    );
  }
};
exports.getContact = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM contact WHERE contact_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Contact not found" })
        : res.json({ contact: results });
    }
  );
};

exports.deleteContact = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM contact WHERE contact_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Contact not found" })
        : res.json({ success: true, message: "Contact successfully deleted" });
    }
  );
};

exports.updateContact = (req, res) => {
  const id = req.params.id;
  const { error } = contactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: true, message: error.message });
  } else {
    connection.query(
      "UPDATE contact SET contact_name = ?, contact_email = ?, contact_phone = ?, contact_date = ?, subject = ?, comment = ?, viewed = ?, archived = ? WHERE contact_id = ?",
      [
        req.body.contact_name,
        req.body.contact_email,
        req.body.contact_phone,
        req.body.contact_date,
        req.body.subject,
        req.body.comment,
        req.body.viewed,
        req.body.archived,
        id,
      ],
      (err, results) => {
        return res.json({
          success: true,
          message: "Contact successfully updated",
        });
      }
    );
  }
};
