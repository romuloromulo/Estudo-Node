const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
  const cart = await req.user.getCart();
  const cartProducts = await cart.getProducts();
  // console.log("CARTPRODUCTS", cartProducts);

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: cartProducts,
  });
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = await req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });

    let product;
    if (products.length > 0) {
      product = products[0];
    }

    let newQuantity = 1;
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + newQuantity;
    }

    const productById = await Product.findByPk(prodId);
    await cart.addProduct(productById, { through: { quantity: newQuantity } });
    res.redirect("/cart");
  } catch (err) {
    console.log("ERROR POST CART", err);
  }
};

// exports.postCartDeleteProduct = async (req, res, next) => {
//   try {
//     const { productId } = req.body;
//     const cart = await req.user.getCart();
//     const products = await cart.getProducts({ where: { id: productId } });
//     const product = products[0];
//     const { cartItem } = product;
//     if (cartItem.quantity === 1) {
//       await product.cartItem.destroy();
//     }
//     if (cartItem.quantity > 1) {
//       cartItem.quantity = cartItem.quantity - 1;
//     }

//     res.redirect("/cart");
//   } catch (err) {
//     console.log("POSTCARTDELETEPRODUCT ERROR", err);
//   }
// };
exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });
    const product = products[0];

    if (!product) {
      return res
        .status(404)
        .json({ message: "Produto não encontrado no carrinho" });
    }

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId: productId },
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Item do carrinho não encontrado" });
    }

    if (cartItem.quantity === 1) {
      await cart.removeProduct(product); // Remova o produto do carrinho
    } else {
      cartItem.quantity -= 1; // Diminua a quantidade do produto no carrinho
      await cartItem.save(); // Salve as alterações na quantidade do produto
    }

    res.redirect("/cart");
  } catch (err) {
    console.log("POSTCARTDELETEPRODUCT ERROR", err);
    res.status(500).json({ message: "Erro ao deletar produto do carrinho" });
  }
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
