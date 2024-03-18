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
    } catch (error) {}
  }
}

module.exports = Product;
