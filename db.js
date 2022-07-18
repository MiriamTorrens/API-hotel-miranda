const mysql = require("mysql");
const { userSQL, passwordSQL, databaseSQL } = require("./env");

const connection = mysql.createConnection({
  host: "localhost",
  user: userSQL,
  password: passwordSQL,
  database: databaseSQL,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = { connection };
