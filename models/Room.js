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
  images: Array,
});

module.exports = model("Room", roomSchema);
