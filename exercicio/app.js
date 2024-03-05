const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const createUserRoute = require("./routes/create-user");
const usersRoute = require("./routes/users");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", createUserRoute.router);
app.use("/users", usersRoute);

app.listen(3000);
