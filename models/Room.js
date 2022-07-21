const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
  room_number: { type: Number, required: true, unique: true },
  bed_type: {
    type: String,
    enum: ["single_bed", "double_bed", "double_superior", "suite"],
    required: true,
  },
  description: { type: String, maxLength: 2000 },
  offer: { type: Boolean, required: true },
  price: { type: Number, required: true },
  discount: Number,
  cancellation: { type: String, maxLength: 2000 },
  amenities: { type: Array, required: true },
  images: { type: Array, required: true },
});

module.exports = model("Room", roomSchema);
