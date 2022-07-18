const express = require("express");
const routerRooms = express.Router();
const rooms = require("../controllers/rooms.controller");

routerRooms.route("/").get(rooms.roomsList).post(rooms.addRoom);
routerRooms
  .route("/:id")
  .get(rooms.getRoom)
  .patch(rooms.updateRoom)
  .delete(rooms.deleteRoom);

module.exports = routerRooms;
