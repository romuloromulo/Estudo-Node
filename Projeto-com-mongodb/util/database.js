const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

async function connectToMongo(cb) {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://romulovianadev:1pQL5n0ocJQjSRDP@estudonode.sthnf7e.mongodb.net/?retryWrites=true&w=majority&appName=estudonode",
      { useNewUrlParser: true, useUnifiedTopology: true } // adicionando as opções de conexão
    );
    console.log("Conexão estabelecida com sucesso!");
    cb(client);
    // Faça o que for necessário com o cliente MongoDB aqui
    // Por exemplo: client.db("nomeDoBancoDeDados").collection("nomeDaColecao").find()...
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

// Chamando a função para conectar ao MongoDB
module.exports = connectToMongo;
