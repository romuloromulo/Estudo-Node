const { deepEqual, ok } = require("assert");
const Database = require("./database/database");

const DEFAULT_ITEM_CADASTRADO = { nome: "Flash", poder: "Speed", id: 1 };

describe("Suite de manipulaçãoe de dados", () => {
  it("deve pesquisar um héroi usando arquivos", async () => {
    const db = new Database(); // Criar uma instância da classe Database
    const expected = DEFAULT_ITEM_CADASTRADO;
    const resultado = await db.listar(expected.id); // Chamar o método listar na instância

    ok(resultado, expected);
  });
});
