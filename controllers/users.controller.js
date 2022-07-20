require("../db");
const User = require("../models/User");

exports.usersList = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

exports.addUser = (req, res) => {
  users.push(req.body);
  return res.json({ success: true, message: "User successfully added" });
};
exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  return !user
    ? res.status(404).json({ success: false, message: "User not found" })
    : res.json(user);
};
exports.deleteUser = (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  users.splice(index, 1);
  return index < 0
    ? res.status(404).json({ success: false, message: "User not found" })
    : res.json({ success: true, message: "User successfully deleted" });
};
exports.updateUser = async (req, res) => {
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
      password: req.body.password,
    }
  );
  return !user
    ? res.status(404).json({ success: false, message: "User not found" })
    : res.json({ success: true, message: "User successfully updated" });
};
