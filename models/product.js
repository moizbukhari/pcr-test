var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: String,
  description: String,
  category: String,
  status:String,
  condition: String,
  gender:String,
  telephone:String,
  email:String,
  ethnicity:String,
  address:String,
  postcode:String,
  country:String,
  participation: String,
  passport:String,
  updated: { type: Date, default: Date.now },
  updated2: { type: Date, default: Date.now },
  
  img: { 
    path: String, 
    contentType: String 
 }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
