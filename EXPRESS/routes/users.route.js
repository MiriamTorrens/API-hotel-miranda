const express = require("express");
const routerUsers = express.Router();
const users = require("../controllers/users.controller");

routerUsers.route("/").get(users.usersList).post(users.addUser);
routerUsers
  .route("/:id")
  .get(users.getUser)
  .patch(users.updateUser)
  .delete(users.deleteUser);

module.exports = routerUsers;
