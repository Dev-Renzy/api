const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var accountModel = new Schema({
  isAdmin: { type: Boolean, default:false},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credentials: {
      firstName : {type: String, required: true},
      middleName : {type: String},
      lastName : {type: String, required: true},
      profession : {type: String, required: true}
      }
});

var Account = mongoose.model("Account", accountModel);
module.exports = Account;
