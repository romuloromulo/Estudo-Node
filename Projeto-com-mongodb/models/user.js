const { getDb } = require("../util/database");
const mongodb = require("mongodb");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  async save() {
    try {
      const db = getDb();
      await db.collection("users").insertOne(this);
      console.log("Novo user criado com sucesso");
    } catch (error) {
      console.error("Erro ao salvar user:", error);
      throw error;
    }
  }

  async addToCart(product) {
    const cartProduct = this.cart.items.findIndex((p) => p._id === product._id);
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static async findById(prodId) {
    try {
      const db = getDb();
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
