const mysql = require("mysql");
const { userSQL, passwordSQL, databaseSQL } = require("./env");

const connection = mysql.createConnection({
  host: "localhost",
  user: userSQL,
  password: passwordSQL,
  database: databaseSQL,
});

module.exports = { connection };
