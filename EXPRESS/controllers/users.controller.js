const users = require("../data/users.json");

exports.usersList = (req, res) => {
  return res.json(users);
};
exports.addUser = (req, res) => {
  users.push(req.body);
  return res.json({ success: true, message: "User successfully added" });
};
exports.getUser = (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
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
        ? res.status(404).json({ success: false, message: "user not found" })
        : (user[index] = req.body);
    }
  });
  return res.json({ success: true, message: "user successfully updated" });
};
