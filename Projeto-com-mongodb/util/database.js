const { MongoClient } = require("mongodb");

let _db;

async function connectToMongo(cb) {
  try {
    const client = new MongoClient(
      "mongodb+srv://romulovianadev:1pQL5n0ocJQjSRDP@estudonode.sthnf7e.mongodb.net/?retryWrites=true&w=majority&appName=estudonode",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    await client.connect();
    console.log("Conexão estabelecida com sucesso!");
    _db = client.db();
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
