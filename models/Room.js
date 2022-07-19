const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
  room_number: Number,
  bed_type: String,
  description: String,
  offer: Boolean,
  price: Number,
  discount: Number,
  cancellation: String,
  amenities: Array,
});

module.exports = model("Room", contactSchema);
