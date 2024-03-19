const { getDb } = require("../util/database");
const mongodb = require("mongodb");
const db = getDb();

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  async save() {
    try {
      await db.collection("users").insertOne(this);
      console.log("Novo user criado com sucesso");
    } catch (error) {
      console.error("Erro ao salvar user:", error);
      throw error;
    }
  }

  static async findById(prodId) {
    try {
      const user = await db
        .collection("users")
        .findOne({ _id: new mongodb.ObjectId(prodId) });
      console.log("chamando", user);
      return user;
    } catch (error) {
      console.error("Erro ao buscar user por ID:", error);
      throw error;
    }
  }
}

module.exports = User;
