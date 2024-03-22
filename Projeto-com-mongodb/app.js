require("dotenv").config();

const path = require("path");

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const { connectToMongo } = require("./util/database");
const User = require("./models/user");

const app = express();

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoute = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(authRoute);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

connectToMongo(() => {
  app.listen(3000);
});
