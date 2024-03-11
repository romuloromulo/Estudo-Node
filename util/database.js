const mysql = require("mysql2");
require("dotenv").config();
const senha = process.env.DATABASE_PASSWORD;
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "curso-node-schema",
  password: senha,
});

module.exports = pool.promise();
