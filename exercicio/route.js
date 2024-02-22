const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head> <title>foda-se</title> </head>");
    res.write("<body><div><h1>OLAAA</h1></div></body>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='userName'/><button type='submit'>Enviar</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head> <title>foda-se</title> </head>");
    res.write("<body><ul><li>user1</li><li>user2</li></ul></body>");
    res.write("</html>");
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      console.log(chunck);
      body.push(chunck);
    });
    req.on("end", () => {
      const parsedBody = Buffer(body);
      console.log("AQUI", parsedBody);
      const message = "a";
      fs.writeFile("user-list.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = requestHandler;
