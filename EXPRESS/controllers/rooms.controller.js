const { JSONCookie } = require("cookie-parser");
const Joi = require("joi");
const { connection } = require("../db");

const roomSchema = Joi.object({
  room_number: Joi.number(),
  bed_type: Joi.string(),
  description: Joi.string(),
  offer: Joi.boolean(),
  price: Joi.number(),
  discount: Joi.number(),
  cancellation: Joi.string(),
  amenities: Joi.string(),
});

exports.roomsList = (req, res) => {
  connection.query("SELECT * FROM rooms", (err, results) => {
    if (err) throw err;
    return res.json({ rooms: results });
  });
};

exports.addRoom = (req, res) => {
  const newRoom = [
    req.body.room_number,
    req.body.bed_type,
    req.body.description,
    req.body.offer,
    req.body.price,
    req.body.discount,
    req.body.cancellation,
    req.body.amenities,
  ];
  connection.query(
    "INSERT INTO rooms (room_number, bed_type, description, offer, price, discount, cancellation, amenities) VALUES (?)",
    [newRoom],
    (err, results) => {
      console.log(newRoom);
      if (err) throw err;
      return res.json({ success: true, message: "Room successfully added" });
    }
  );
};

exports.getRoom = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT room_id, room_number, bed_type, description, offer, price, discount, cancellation, amenities, GROUP_CONCAT(url_image SEPARATOR ', ') AS images FROM rooms INNER JOIN rooms_images USING (room_id) WHERE room_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Room not found" })
        : res.json({ room: results });
    }
  );
};

exports.deleteRoom = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM rooms WHERE room_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Room not found" })
        : res.json({ success: true, message: "Room successfully deleted" });
    }
  );
};

exports.updateRoom = (req, res) => {
  const id = req.params.id;
  connection.query(
    "UPDATE rooms SET room_number = ?, bed_type = ?, description = ?, offer = ?, price = ?, discount = ?, cancellation = ?, amenities = ? WHERE room_id = ?",
    [
      req.body.room_number,
      req.body.bed_type,
      req.body.description,
      req.body.offer,
      req.body.price,
      req.body.discount,
      req.body.cancellation,
      req.body.amenities,
      id,
    ],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "Room not found" })
        : res.json({ success: true, message: "Room successfully updated" });
    }
  );
};
