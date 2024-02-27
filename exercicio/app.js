const express = require("express");

app.use("/users", (req, res, next) => {
  res.send("<h1>pagina user</h1>");
});
app.use("/", (req, res, next) => {
  res.send("<h1>pagina 1</h1>");
});

app.listen(3000);
