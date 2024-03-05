const express = require("express");
const router = express.Router();
const path = require("path"); // Adicione esta linha
const rootDir = require("../util/path");

const users = [];

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "create-user.html"));
});

router.post("/", (req, res, next) => {
  users.push({ name: req.body.name });
  res.redirect("/users");
});

module.exports = {
  router: router,
  users: users,
};
