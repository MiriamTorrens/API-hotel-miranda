const Joi = require("joi");
const { connection } = require("../db");
const bcrypt = require("bcrypt");

const userSchema = Joi.object({
  user_name: Joi.string().max(100).required(),
  user_email: Joi.string().email().required(),
  user_phone: Joi.string()
    .length(11)
    .pattern(/^[0-9-]+$/)
    .required(),
  start_date: Joi.date().required(),
  occupation: Joi.string().valid("manager", "reception", "room_service"),
  status: Joi.number().min(0).max(1).required(),
  photo: Joi.string().required(),
  password: Joi.string().min(6).max(100).alphanum().required(),
});

exports.usersList = (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    return res.json({ users: results });
  });
};

exports.addUser = (req, res) => {
  const newUser = [
    req.body.user_name,
    req.body.user_email,
    req.body.user_phone,
    req.body.start_date,
    req.body.occupation,
    req.body.status,
    req.body.photo,
    bcrypt.hashSync(req.body.password, 5),
  ];
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.json({ success: false, message: error.message });
  } else {
    connection.query(
      "INSERT INTO users (user_name, user_email, user_phone, start_date, occupation, status, photo, password) VALUES (?)",
      [newUser],
      (err, results) => {
        if (err) throw err;
        return res.json({ success: true, message: "User successfully added" });
      }
    );
  }
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "User not found" })
        : res.json({ user: results });
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM users WHERE user_id = ?",
    [id],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "User not found" })
        : res.json({ success: true, message: "User successfully deleted" });
    }
  );
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  } else {
    connection.query(
      "UPDATE users SET user_name = ?, user_email = ?, user_phone = ?, start_date = ?, occupation = ?, status = ?, photo = ?, password = ? WHERE user_id = ?",
      [
        req.body.user_name,
        req.body.user_email,
        req.body.user_phone,
        req.body.start_date,
        req.body.occupation,
        req.body.status,
        req.body.photo,
        bcrypt.hashSync(req.body.password),
        id,
      ],
      (err, results) => {
        return !results
          ? res.status(404).json({ success: false, message: "User not found" })
          : res.json({ success: true, message: "User successfully updated" });
      }
    );
  }
};
