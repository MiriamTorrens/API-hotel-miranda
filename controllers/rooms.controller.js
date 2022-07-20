require("../db");
const Room = require("../models/Room");

exports.roomsList = async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.json(rooms);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.addRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    return res.json({ success: true, message: "Room successfully added" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    return !room
      ? res.status(404).json({ success: false, message: "Room not found" })
      : res.json(room);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ _id: req.params.id });
    return !room
      ? res.status(404).json({ success: false, message: "Room not found" })
      : res.json({ success: true, message: "Booking successfully deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
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
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
