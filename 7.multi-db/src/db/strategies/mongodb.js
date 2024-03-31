const ICrud = require("./interfaces/interfaceCrud");

class MongoDb extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("Item Criado");
  }
}
module.exports = MongoDb;
