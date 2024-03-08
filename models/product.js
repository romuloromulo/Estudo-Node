const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const writeFile = (item) => {
  fs.writeFile(p, JSON.stringify(item), (err) => {
    console.log(err);
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );

        const updadtedProduct = [...products];
        updadtedProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updadtedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        writeFile(products);
      }
    });
  }

  static delete(prodId) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((p) => p.id !== prodId);
      if (updatedProducts.length !== products.length) {
        writeFile(updatedProducts);
      } else {
        console.log("Product not found.");
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
