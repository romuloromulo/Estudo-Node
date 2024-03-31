class MongoDb extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("Item Criado");
  }
}

class Postgres extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("Item Criado");
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(query) {
    return this._database.read(query);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }
}

const contextMongo = new ContextStrategy(new MongoDb());
contextMongo.read();
