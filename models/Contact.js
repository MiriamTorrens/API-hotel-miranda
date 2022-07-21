const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  contact_name: { type: String, required: true },
  contact_email: { type: String, required: true },
  contact_phone: { type: String, required: true },
  contact_date: {
    type: Date,
    required: true,
    default: Date.now,
    required: true,
  },
  subject: { type: String, required: true, maxLength: 500 },
  comment: { type: String, required: true, maxLength: 2000 },
  viewed: { type: Boolean, default: false, required: true },
  archived: { type: Boolean, default: false, required: true },
});

module.exports = model("Contact", contactSchema);
