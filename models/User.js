const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  user_name: String,
  user_email: String,
  user_phone: String,
  start_date: Date,
  occupation: String,
  status: Boolean,
  user_image: String,
  password: String,
});

module.exports = model("User", userSchema);
