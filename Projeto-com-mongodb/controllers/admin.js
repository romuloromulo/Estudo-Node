const Product = require("../models/product");
const { getProductById } = require("./shop");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.user,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.session.user._id
  );

  try {
    // Chame o método save() na instância de Product
    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    // Lide com o erro adequadamente
    console.log(error);
    // Envie uma resposta de erro
    res.status(500).send("Erro ao adicionar produto");
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  const product = await Product.findById(prodId);

  if (!product) {
    return res.redirect("/");
  }
  console.log("PRODUTOEDIT", product);
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product: product,
    isAuthenticated: req.session.user,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  console.log("TESSSSTE");
  const product = new Product(title, price, description, imageUrl, productId);
  await product.save();
  res.redirect("/admin/products");
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      isAuthenticated: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.deleteById(prodId);
  req.session.user.removeFromCart(getProductById);
  res.redirect("/admin/products");
};
