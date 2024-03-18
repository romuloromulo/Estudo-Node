const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.save({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  });

  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  req.user.getProducts({ where: { id: prodId } }).then((products) => {
    const product = products[0];
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  const prodId = productId;
  const updatedTitle = title;
  const updatedPrice = price;
  const updatedImageUrl = imageUrl;
  const updatedDesc = description;

  Product.findByPk(prodId)
    .then((p) => {
      p.title = updatedTitle;
      p.price = updatedPrice;
      p.imageUrl = updatedImageUrl;
      p.description = updatedDesc;
      p.save();
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findByPk(prodId);
  const response = await product.destroy();
  // console.log(response);
  res.redirect("/admin/products");
};
