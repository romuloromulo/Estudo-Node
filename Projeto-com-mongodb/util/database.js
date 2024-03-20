const { MongoClient } = require("mongodb");

let _db;

async function connectToMongo(cb) {
  try {
    const client = new MongoClient(process.env.DB_URL);
    const resp = await client.connect();
    // console.log(resp);
    console.log("Conexão estabelecida com sucesso!");
    _db = resp.db();
    cb();

    // Faça o que for necessário com o cliente MongoDB aqui
    // Por exemplo: client.db("nomeDoBancoDeDados").collection("nomeDaColecao").find()...
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "Database não encontrada";
};

// Chamando a função para conectar ao MongoDB
exports.connectToMongo = connectToMongo;
exports.getDb = getDb;
