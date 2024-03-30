const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const readFyleAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = "./database/herois.json";
  }

  async obterArquivos() {
    console.log(this.NOME_ARQUIVO);
    const arquivos = await readFyleAsync(this.NOME_ARQUIVO, "utf-8");
    return JSON.parse(arquivos.toString());
  }

  async escreverArquivo(dados) {
    try {
      await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async cadastrar(heroi) {
    try {
      const dados = await this.obterArquivos();
      const id = heroi.id <= 2 ? heroi.id : Date.now();

      const heroicomId = {
        id,
        ...heroi,
      };
      const herois = [...dados, heroicomId];
      const resp = await this.escreverArquivo(herois);
      return resp;
    } catch (err) {
      console.log(err);
    }
  }

  async listar(id) {
    const dados = await this.obterArquivos();
    const dadosFilter = dados.filter((item) => (id ? item.id === id : true));
    return dadosFilter;
  }
}

module.exports = Database;

console.log("Database:", Database); // Adicionando um console para verificar a classe Database
