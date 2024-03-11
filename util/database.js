const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "curso-node-schema",
  password: process.env.DATABASE_PASSWORD,
});

module.exports = pool.promise();
