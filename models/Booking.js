const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  guest_name: { type: String, required: true },
  order_date: { type: Date, required: true, default: Date.now, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  special_request: { type: String, maxLength: 2000 },
  room_id: { type: Schema.ObjectId, ref: "Room" },
  status: {
    type: String,
    enum: ["checkin", "checkout", "in_progress"],
    required: true,
  },
});

module.exports = model("Booking", bookingSchema);
