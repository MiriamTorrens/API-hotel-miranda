const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  guest_name: String,
  order_date: Date,
  checkin: Date,
  checkout: Date,
  special_request: String,
  room_id: Number,
  status: String,
});

module.exports = model("Booking", bookingSchema);
