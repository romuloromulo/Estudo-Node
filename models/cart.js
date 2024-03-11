const fs = require("fs");
const path = require("path");

// Caminho para o arquivo onde o carrinho será armazenado
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

// Função para escrever o carrinho no arquivo
const writeCartToFile = (cart) => {
  fs.writeFile(p, JSON.stringify(cart), (err) => {
    if (err) {
      console.error("Erro ao escrever no arquivo do carrinho:", err);
    }
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Buscar o carrinho anterior
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analisar o carrinho => Encontrar produto existente
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Adicionar novo produto / aumentar quantidade
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      writeCartToFile(cart);
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
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
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
