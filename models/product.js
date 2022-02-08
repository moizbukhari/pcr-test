var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: String,
  description: String,
  category: String,
  status:String,
  condition: String,
  updated: { type: Date, default: Date.now },
  
  img: { 
    path: String, 
    contentType: String 
 }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
