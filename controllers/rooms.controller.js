require("../db");
const Room = require("../models/Room");

exports.roomsList = async (req, res) => {
  const rooms = await Room.find();
  return res.json(rooms);
};
exports.addRoom = (req, res) => {
  rooms.push(req.body);
  return res.json({ success: true, message: "Room successfully added" });
};
exports.getRoom = async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id });
  return !room
    ? res.status(404).json({ success: false, message: "Room not found" })
    : res.json(room);
};
exports.deleteRoom = (req, res) => {
  const index = rooms.findIndex((r) => r.id === req.params.id);
  rooms.splice(index, 1);
  return index < 0
    ? res.status(404).json({ success: false, message: "Room not found" })
    : res.json({ success: true, message: "Room successfully deleted" });
};
exports.updateRoom = async (req, res) => {
  const room = await Room.update(
    { _id: req.params.id },
    {
      room_number: req.body.room_number,
      bed_type: req.body.bed_type,
      offer: req.body.offer,
      price: req.body.price,
      discount: req.body.discount,
      cancellation: req.body.cancellation,
      amenities: req.body.amenities,
      images: req.body.images,
    }
  );
  return !room
    ? res.status(404).json({ success: false, message: "Room not found" })
    : res.json({ success: true, message: "Booking successfully updated" });
};
