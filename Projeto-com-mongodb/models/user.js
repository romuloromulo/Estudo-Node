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
    //Checando se o cart já possui o produto e se possuir achar o index dele na array de items
    const cartProductIndex = this.cart.items.findIndex((p) => {
      return p.productId.toHexString() === product._id.toString();
    });

    let newQuantity = 1;
    //Declarando uma nova array utilizando uma cópia da original
    const updatedCartItems = [...this.cart.items];
    //Checando se o cart já possui o produto
    if (cartProductIndex >= 0) {
      //se sim, então localiza o produto na array original por meio do index adiquirido e incrementa sua quantidade em 1.
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      //faz update da quantidade no produto especifico do carrinho utilizando o index
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      //se nao possui o produto, apenas inserir no carrinho um novo produto
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

  async removeFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toHexString() !== productId;
    });

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
