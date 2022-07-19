const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  contact_name: String,
  contact_email: String,
  contact_phone: String,
  contact_date: Date,
  subject: String,
  comment: String,
  viewed: Boolean,
  archived: Boolean,
});

module.exports = model("Contact", contactSchema);
