const bookings = require('../data/bookings.json');

exports.bookingsList = (req, res) => {
  return res.json(bookings);
};
exports.addBooking = (req, res) => {
  //bookings.push(req.body);
  return res.json({ success: true, message: "Booking successfully added" });
};
exports.getBooking = (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  return !booking
    ? res.status(404).json({ success: false, message:"Booking not found" })
    : res.json(booking);
};
exports.deleteBooking = (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  //bookings.splice(index, 1);
  return index < 0
    ? res.status(404).json({ success: false, message: "Booking not found" })
    : res.json( { success: true, message: "Booking successfully deleted" });
};
exports.updateBooking = (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  //bookings[index] = req.body;
  return index < 0
    ? res.status(404).json({ success: false, message: "Booking not found" })
    : res.json({ success: true, message: "Booking successfully updated" });
};
