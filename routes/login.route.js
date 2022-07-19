const express = require("express");
const routerLogin = express.Router();
const login = require("../controllers/login.controller");

routerLogin.route("/").post(login.login);

module.exports = routerLogin;
