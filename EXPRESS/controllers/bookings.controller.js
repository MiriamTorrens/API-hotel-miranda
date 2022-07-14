const Joi = require("joi");
const { connection } = require("../db");

const bookingSchema = Joi.object({
  guest_name: Joi.string().max(30).required(),
  order_date: Joi.date().required(),
  checkin: Joi.date().required(),
  checkout: Joi.date().required(),
  special_request: Joi.string().max(400),
  room_id: Joi.number().required(),
  status: Joi.string().valid("checkin", "checkout", "in_progress"),
});

exports.bookingsList = (req, res) => {
  connection.query("SELECT * FROM bookings", (err, results) => {
    if (err) throw err;
    return res.json({ bookings: results });
  });
};

exports.addBooking = (req, res) => {
  const newBooking = [
    req.body.guest_name,
    req.body.order_date,
    req.body.checkin,
    req.body.checkout,
    req.body.special_request,
    req.body.room_id,
    req.body.status,
  ];
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.json({ success: false, message: error.details[0].message });
  } else {
    connection.query(
      "INSERT INTO bookings (guest_name, order_date, checkin, checkout, special_request, room_id, status) VALUES (?)",
      [newBooking],
      (err, results) => {
        if (err) throw err;
        return res.json({
          success: true,
          message: "Booking successfully added",
        });
      }
    );
  }
};

exports.getBooking = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM bookings WHERE booking_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Booking not found" })
        : res.json({ booking: results });
    }
  );
};
exports.deleteBooking = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM bookings WHERE booking_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Booking not found" })
        : res.json({
            success: true,
            message: "Booking successfully deleted",
          });
    }
  );
};

exports.updateBooking = (req, res) => {
  const id = req.params.id;
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.json({ success: false, message: error.details[0].message });
  } else {
    connection.query(
      "UPDATE bookings SET guest_name = ?, order_date = ?, checkin = ?, checkout = ?, special_request = ?, room_id = ?, status = ? WHERE booking_id = ?",
      [
        req.body.guest_name,
        req.body.order_date,
        req.body.checkin,
        req.body.checkout,
        req.body.special_request,
        req.body.room_id,
        req.body.status,
        id,
      ],

      (err, results) => {
        return !results
          ? res
              .status(404)
              .json({ success: false, message: "Booking not found" })
          : res.json({
              success: true,
              message: "Booking successfully updated",
            });
      }
    );
  }
};
