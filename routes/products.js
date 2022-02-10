var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const uploadFile = require("./middleware/upload");
var imagepath = "stylesheets/collectionlogo1.png";
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage })
var checkSessionAuth = require("../middlewares/checkSessionAuth");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  res.render("products/list", { title: "Products In DB", products });
});

router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/add");
});
// store data in db
router.post("/add",async function (req, res, next) {
  let product = new Product(req.body);
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.category= req.body.category;
  product.condition= req.body.condition;
  product.status=req.body.status;
  product.Date=req.body.Date;
  product.Date2=req.body.Date2;
  product.gender=req.body.gender;
  product.telephone=req.body.telephone;
  product.email=req.body.email;
  product.ethnicity=req.body.ethnicity;
  product.country=req.body.country;
  product.address=req.body.address;
  product.postalcode=req.body.postalcode;
  product.participation=req.body.participation;
  product.img.path ="stylesheets/"+ req.body.file;
  product.img.contentType = "image/png";

  await product.save();
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
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
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});
// const upload = async (req, res) => {
  
// };

router.post("/edit/:id", async function (req, res, next) {
  // try {
  //   await uploadFile(req, res);
  //   if (req.file == undefined) {
  //     return res.status(400).send({ message: "Please upload a file!" });
  //   }
  //   res.status(200).send({
  //     message: "Uploaded the file successfully: " + req.file.originalname,
  //   });
  // } catch (err) {
  //   res.status(500).send({
  //     message: `Could not upload the file: ${req.file.originalname}. ${err}`,
  //   });
  // }


  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.category= req.body.category;
  product.condition= req.body.condition;
  product.status=req.body.status;
  product.Date=req.body.Date;
  product.Date2=req.body.Date2;
  product.gender=req.body.gender;
  product.telephone=req.body.telephone;
  product.email=req.body.email;
  product.ethnicity=req.body.ethnicity;
  product.country=req.body.country;
  product.address=req.body.address;
  product.postalcode=req.body.postalcode;
  product.participation=req.body.participation;

  product.img.path ="stylesheets/"+ req.body.file;
  product.img.contentType = "image/png";
  await product.save();
  res.redirect("/products");
});

router.get('/portal',async function(req, res) {
  let product=await products.find({Id: req.body._id});
res.send(product);
});

module.exports = router;
