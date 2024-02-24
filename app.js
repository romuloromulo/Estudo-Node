const http = require("http");
const express = require("express");
const app = express();

app.use((req, resp, next) => {
  console.log("Teste!2");
  next();
});
app.use((req, resp, next) => {
  console.log("Teste!");
  next();
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Servidor está ouvindo na porta 3000");
});
