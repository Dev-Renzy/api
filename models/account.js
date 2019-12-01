const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var accountModel = new Schema({
  isAdmin: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
  profession: { type: String, required: true },
  haschange:{type:Boolean, required:true}
});

var Account = mongoose.model("Account", accountModel);
module.exports = Account;
