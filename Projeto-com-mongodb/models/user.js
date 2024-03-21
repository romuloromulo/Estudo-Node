const { getDb } = require("../util/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart || { items: [] };
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
  addToCart(product) {
    // console.log(
    //   "PRODUTO ADD TO CART",
    //   product._id.toString(),
    //   this.cart.items[4].productId.toHexString()
    // );
    const cartProductIndex = this.cart.items.findIndex((p) => {
      return p.productId.toHexString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    // console.log("CARTPRODUCTINDEX", cartProductIndex);
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  async getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => i.productId);

    const products = await db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map((prod) => {
      return {
        ...prod,
        quantity: this.cart.items.find(
          (i) => i.productId.toHexString() === prod._id.toString()
        ).quantity,
      };
    });
  }

  static async findById(prodId) {
    try {
      const db = getDb();
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(prodId) });
      console.log("chamando", user);
      return user;
    } catch (error) {
      console.error("Erro ao buscar user por ID:", error);
      throw error;
    }
  }
}

module.exports = User;
