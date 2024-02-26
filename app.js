const http = require("http");
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Teste!223");
  next();
});
app.use((req, res, next) => {
  res.send(<h1>Minha pica</h1>);
});

app.listen(3000);
