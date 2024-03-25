const assert = require("assert");
const { describe, it } = require("mocha");
const { getPeople } = require("./service");

describe("Star Wars Tests", () => {
  it("deve buscar r2d2 com o formato correto", async () => {
    const expected = [{ name: "R2-D2", height: "96" }];
    const nomeBase = "r2-d2";
    const resultado = await getPeople(nomeBase);
    assert.deepEqual(resultado, expected);
  });
});
