const { connection } = require("../db");

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
    req.body.password,
  ];
  connection.query(
    "INSERT INTO users (user_name, user_email, user_phone, start_date, occupation, status, photo, password) VALUES (?)",
    [newUser],
    (err, results) => {
      if (err) throw err;
      return res.json({ success: true, message: "User successfully added" });
    }
  );
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
      req.body.password,
      id,
    ],
    (err, results) => {
      return !results
        ? res.status(404).json({ success: false, message: "User not found" })
        : res.json({ success: true, message: "User successfully updated" });
    }
  );
};
