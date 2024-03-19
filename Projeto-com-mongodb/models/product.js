const { getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  async save() {
    try {
      const db = getDb();
      const resp = await db.collection("products").insertOne(this);
      console.log(resp);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      throw error;
    }
  }

  static async fetchAll() {
    try {
      const db = getDb();
      const products = await db.collection("products").find().toArray();
      console.log("PRODUTOS", products);
      return products;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }
}

module.exports = Product;
