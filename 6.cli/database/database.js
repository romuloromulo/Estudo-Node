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
  async remover(id) {
    try {
      if (!id) {
        return await this.escreverArquivo();
      }
      const dados = await this.obterArquivos();

      // Encontra o índice do item com o ID especificado na lista de dados
      const index = dados.findIndex((item) => item.id === parseInt(id));
      if (index === -1) {
        throw Error("heroi nao existe");
      }
      // Remove o item com base no índice encontrado
      dados.splice(index, 1);
      // Escreve os dados atualizados no arquivo
      return await this.escreverArquivo(dados);
    } catch (err) {
      console.error("Erro ao remover o item:", err);
    }
  }

  async updateArqv(novosdados) {
    try {
      // Verifica se o ID fornecido é um número válido
      if (!novosdados.id || isNaN(parseInt(novosdados.id))) {
        throw new Error("ID inválido.");
      }

      let dados = await this.obterArquivos();
      const index = dados.findIndex(
        (item) => item.id === parseInt(novosdados.id)
      );
      if (index === -1) {
        throw new Error("Herói não encontrado.");
      }

      dados[index] = novosdados;

      // Escreve os dados atualizados no arquivo e retorna o resultado da operação
      return await this.escreverArquivo(dados);
    } catch (err) {
      console.error("Erro ao atualizar o herói:", err);
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
