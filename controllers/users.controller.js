require("../db");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.usersList = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
exports.addUser = async (req, res) => {
  const newUser = new User({
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_phone: req.body.user_phone,
    start_date: req.body.start_date,
    occupation: req.body.occupation,
    status: req.body.status,
    user_image: req.body.user_image,
    password: bcrypt.hashSync(req.body.password, 5),
  });
  try {
    await newUser.save();
    return res.json({ success: true, message: "User successfully added" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return !user
      ? res.status(404).json({ success: false, message: "User not found" })
      : res.json(user);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    return !user
      ? res.status(404).json({ success: false, message: "User not found" })
      : res.json({ success: true, message: "User successfully deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        start_date: req.body.start_date,
        occupation: req.body.occupation,
        status: req.body.status,
        user_image: req.body.user_image,
        password: bcrypt.hashSync(req.body.password, 5),
      }
    );
    return !user
      ? res.status(404).json({ success: false, message: "User not found" })
      : res.json({ success: true, message: "User successfully updated" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
