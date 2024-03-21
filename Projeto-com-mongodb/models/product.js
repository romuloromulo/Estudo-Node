const { getDb } = require("../util/database");
const mongodb = require("mongodb");
const User = require("./user");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  async save() {
    try {
      const db = getDb();
      if (this._id) {
        await db
          .collection("products")
          .updateOne({ _id: this._id }, { $set: this });
        console.log("Produto atualizado com sucesso");
      } else {
        await db.collection("products").insertOne(this);
        console.log("Novo produto criado com sucesso");
      }
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

  static async deleteById(prodId) {
    try {
      const db = getDb();
      const result = await db
        .collection("products")
        .deleteOne({ _id: new mongodb.ObjectId(prodId) });
      console.log("Produto deletado:", result);
      return result;
    } catch (error) {
      console.error("Erro ao deletar produto por ID:", error);
      throw error;
    }
  }
}

module.exports = Product;
