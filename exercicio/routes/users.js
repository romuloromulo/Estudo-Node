const express = require("express");

const router = express.Router();

const usersData = require("./create-user");

router.get("/", (req, res, next) => {
  users = usersData.users;

  res.render("users", {
    users: users,
    pageTitle: "Users",
    path: "/users",
    hasUsers: users.length > 0,
  });
});

router.post("/clear-users", (req, res, next) => {
  usersData.clearUsers();
  res.redirect("/users");
});

module.exports = router;
