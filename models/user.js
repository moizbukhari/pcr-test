var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  number: String
  admin: Boolean,
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
