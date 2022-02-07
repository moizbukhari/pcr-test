var express = require("express");
var router = express.Router();
var Product = require("../models/product");


router.get("/products" ,async function(req,res){
let product=await Product.find()
res.send(product)


});
router.post("/products" ,async function(req,res){
   let product= new Product();
   product.name=req.body.name;
   product.price=req.body.price;


   await product.save();
   res.send("successful")
    
    
    });
    
  
module.exports=router;