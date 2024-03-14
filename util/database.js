const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "curso-node-schema",
  "root",
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
