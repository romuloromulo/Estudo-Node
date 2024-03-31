const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("Item Criado");
  }
}

module.exports = Postgres;
