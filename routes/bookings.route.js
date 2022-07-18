const express = require("express");
const routerBookings = express.Router();
const bookings = require("../controllers/bookings.controller");

routerBookings.route("/").get(bookings.bookingsList).post(bookings.addBooking);
routerBookings
  .route("/:id")
  .get(bookings.getBooking)
  .patch(bookings.updateBooking)
  .delete(bookings.deleteBooking);

module.exports = routerBookings;
