const { readFile } = require("fs");
const { promisify } = require("util");
const readFyleAsync = promisify(readFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = "./database/herois.json";
  }

  async obterArquivos() {
    console.log(this.NOME_ARQUIVO);
    const arquivos = await readFyleAsync(this.NOME_ARQUIVO, "utf-8");
    return JSON.parse(arquivos.toString());
  }

  escreverArquivo() {}

  async listar(id) {
    const dados = await this.obterArquivos();
    const dadosFilter = dados.filter((item) => (id ? item.id === id : true));
    return dadosFilter;
  }
}

module.exports = Database;

console.log("Database:", Database); // Adicionando um console para verificar a classe Database
