const Product = require("../models/product");
// const Cart = require("../models/cart");
// const CartItem = require("../models/cart-item");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    if (!product) {
      return res
        .status(404)
        .render("404", { pageTitle: "Produto não encontrado" });
    }
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    res
      .status(500)
      .render("error/500", { pageTitle: "Erro interno do servidor" });
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cartProducts = await req.user.getCart();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts,
    });
  } catch (error) {
    console.log("Erro ao carregar carrinho:", error);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const { productId } = await req.body;
    const product = await Product.findById(productId);
    console.log("PRODUTO", product);
    const result = await req.user.addToCart(product);
    res.redirect("/cart");
    console.log("RESULTADO", result);
  } catch (err) {
    console.log("ERROR POST CART", err);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    await req.user.removeFromCart(productId);
    res.redirect("/cart");
  } catch (err) {
    console.log("POSTCARTDELETEPRODUCT ERROR", err);
  }
};
// exports.postCartDeleteProduct = async (req, res, next) => {
//   try {
//     const { productId } = req.body;
//     const cart = await req.user.getCart();
//     const products = await cart.getProducts({ where: { id: productId } });
//     const product = products[0];

//     if (!product) {
//       return res
//         .status(404)
//         .json({ message: "Produto não encontrado no carrinho" });
//     }

//     const cartItem = await CartItem.findOne({
//       where: { cartId: cart.id, productId: productId },
//     });

//     if (!cartItem) {
//       return res
//         .status(404)
//         .json({ message: "Item do carrinho não encontrado" });
//     }

//     if (cartItem.quantity === 1) {
//       await cart.removeProduct(product); // Remova o produto do carrinho
//     } else {
//       cartItem.quantity -= 1; // Diminua a quantidade do produto no carrinho
//       await cartItem.save(); // Salve as alterações na quantidade do produto
//     }

//     res.redirect("/cart");
//   } catch (err) {
//     console.log("POSTCARTDELETEPRODUCT ERROR", err);
//     res.status(500).json({ message: "Erro ao deletar produto do carrinho" });
//   }
// };

// exports.getOrders = async (req, res, next) => {
//   const orders = await req.user.getOrders({ include: ["products"] });
//   console.log("ORDERS", orders);
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//     orders: orders,
//   });
// };

// exports.postOrder = async (req, res, next) => {
//   try {
//     const cart = await req.user.getCart();
//     const products = await cart.getProducts();
//     const order = await req.user.createOrder();
//     console.log("ORDER", order);
//     const result = await order.addProducts(
//       products.map((product) => {
//         product.OrderItem = { quantity: product.cartItem.quantity };
//         return product;
//       })
//     );

//     await cart.setProducts(null);
//     res.redirect("/orders");
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
