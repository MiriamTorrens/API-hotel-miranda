require("../db");
const Booking = require("../models/Booking");

exports.bookingsList = async (req, res) => {
  try {
    const bookings = await Booking.find();
    return res.json(bookings);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.addBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    return res.json({ success: true, message: "Booking successfully added" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    return !booking
      ? res.status(404).json({ success: false, message: "Booking not found" })
      : res.json(booking);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    return !booking
      ? res.status(404).json({ success: false, message: "Booking not found" })
      : res.json({ success: true, message: "Booking successfully deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id },
      {
        guest_name: req.body.guest_name,
        order_date: req.body.order_date,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        special_request: req.body.special_request,
        room_id: req.body.room_id,
        status: req.body.status,
      }
    );
    return !booking
      ? res.status(404).json({ success: false, message: "Booking not found" })
      : res.json({ success: true, message: "Booking successfully updated" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
