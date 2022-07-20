require("../db");
const Booking = require("../models/Booking");

exports.bookingsList = async (req, res) => {
  const bookings = await Booking.find();
  return res.json(bookings);
};
exports.addBooking = (req, res) => {
  bookings.push(req.body);
  return res.json({ success: true, message: "Booking successfully added" });
};
exports.getBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id });
  return !booking
    ? res.status(404).json({ success: false, message: "Booking not found" })
    : res.json(booking);
};
exports.deleteBooking = (req, res) => {
  const index = bookings.findIndex((b) => b.id === req.params.id);
  bookings.splice(index, 1);
  return index < 0
    ? res.status(404).json({ success: false, message: "Booking not found" })
    : res.json({ success: true, message: "Booking successfully deleted" });
};
exports.updateBooking = async (req, res) => {
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
};
