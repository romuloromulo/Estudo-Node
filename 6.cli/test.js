const { deepEqual, ok } = require("assert");
const Database = require("./database/database");

const DEFAULT_ITEM_CADASTRADO = { nome: "Flash", poder: "Speed", id: 1 };

describe("Suite de manipulaçãoe de dados", () => {
  before(async () => {
    const db = new Database();
    await db.cadastrar(DEFAULT_ITEM_CADASTRADO);
  });
  it("deve pesquisar um héroi usando arquivos", async () => {
    const db = new Database(); // Criar uma instância da classe Database
    const expected = DEFAULT_ITEM_CADASTRADO;
    const resultado = await db.listar(expected.id); // Chamar o método listar na instância

    deepEqual(resultado[0], expected);
  });
  it("deve escrever um héroi usando arquivos", async () => {
    const db = new Database(); // Criar uma instância da classe Database
    const expected = DEFAULT_ITEM_CADASTRADO;
    const resultado = await db.cadastrar(DEFAULT_ITEM_CADASTRADO);
    const [actual] = await db.listar(DEFAULT_ITEM_CADASTRADO.id);
    // Chamar o método listar na instância

    deepEqual(actual, expected);
  });
  it("deve remover um heroi por id", async () => {
    const db = new Database(); // Criar uma instância da classe Database
    const expected = true;
    const result = await db.remover(DEFAULT_ITEM_CADASTRADO.id);

    deepEqual(result, expected);
  });
  it("deve atualizar um heroi por id", async () => {
    const db = new Database(); // Criar uma instância da classe Database
    const novoHeroi = { id: 1, nome: "Superman", poder: "Super força" };

    // Chama o método de atualização
    const resultado = await db.updateArqv(novoHeroi);

    // Verifica se o resultado contém o herói atualizado
    const [heroiAtualizado] = await db.listar(novoHeroi.id);
    deepEqual(
      heroiAtualizado,
      novoHeroi,
      "O herói não foi atualizado corretamente"
    );
  });
});
