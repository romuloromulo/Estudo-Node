const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

const getCartFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb({ products: [], totalPrice: 0 });
    } else {
      cb(JSON.parse(fileContent), err);
    }
  });
};

const writeCartToFile = (cart) => {
  fs.writeFile(p, JSON.stringify(cart), (err) => {
    if (err) {
      console.error("Error writing to cart file:", err);
    }
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    getCartFromFile((cart) => {
      const existingProdIndex = cart.products.findIndex((p) => p.id === id);
      const existingProd = cart.products[existingProdIndex];
      let updatedProd;
      if (existingProd) {
        updatedProd = { ...existingProd };
        updatedProd.qty = updatedProd.qty + 1;
        cart.products[existingProdIndex] = updatedProd;
      } else {
        updatedProd = { id: id, qty: 1 };
        cart.products.push(updatedProd);
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      writeCartToFile(cart);
    });
  }

  static deleteProduct(id, productPrice) {
    getCartFromFile((cart) => {
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      writeCartToFile(updatedCart);
    });
  }

  static getCart(cb) {
    getCartFromFile((cart, err) => {
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
