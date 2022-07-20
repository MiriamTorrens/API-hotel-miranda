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
exports.updateUser = (req, res) => {
  users.forEach((user, index) => {
    if (user.id === req.params.id) {
      user = user[index];
      return !user[index]
        ? res.status(404).json({ success: false, message: "User not found" })
        : (user[index] = req.body);
    }
  });
  return res.json({ success: true, message: "User successfully updated" });
};
