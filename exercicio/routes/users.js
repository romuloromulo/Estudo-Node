const express = require("express");

const router = express.Router();

const usersData = require("./create-user");

router.get("/", (req, res, next) => {
  users = usersData.users;
  console.log("USERSSS", users);
  res.render("users", {
    users: users,
    pageTitle: "Users",
    path: "/users",
    // hasUsers: users.length > 0,
  });
});

module.exports = router;
