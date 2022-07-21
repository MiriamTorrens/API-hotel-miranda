const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  user_name: { type: String, required: true, unique: true },
  user_email: { type: String, required: true, trim: true, unique: true },
  user_phone: { type: String, required: true, unique: true },
  start_date: { type: Date, required: true },
  occupation: {
    type: String,
    enum: ["manager", "reception", "room_service"],
    required: true,
  },
  status: { type: Boolean, default: true, required: true },
  user_image: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 100,
    trim: true,
    unique: true,
  },
});

module.exports = model("User", userSchema);
