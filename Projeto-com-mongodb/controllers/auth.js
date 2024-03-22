const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = async (req, res, next) => {
  req.session.isLoggedIn = true;

  const user = await User.findById("65fafa96541032e7c232b103");
  req.session.user = new User(user.name, user.email, user.cart, user._id);

  res.redirect("/");
};
