const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDb = require("./db/strategies/mongodb");

const contextMongo = new ContextStrategy(new MongoDb());
contextMongo.create();
