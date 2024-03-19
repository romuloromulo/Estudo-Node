const { getDb } = require("../util/database");
const mongodb = require("mongodb");

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

  static async findById(prodId) {
    try {
      const db = getDb();
      const product = await db
        .collection("products")
        .findOne({ _id: new mongodb.ObjectId(prodId) });
      console.log("chamando", product);
      return product;
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      throw error;
    }
  }
}

module.exports = Product;
