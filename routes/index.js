var express = require("express");
var router = express.Router();
var Product = require("../models/product");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/detail", async function (req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  res.render("detail", { title: "Products INFO", products });
});
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact" });
});
router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.render("cart", { cart });
});
router.get("/list2", async function (req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  res.render("list2", { title: "Products In DB", products });
});
router.get("/cart/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("Add This Product in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/cart");
});
module.exports = router;
