const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var accountModel = new Schema({
    username: { type: String , required :true},
    password:  { type: String , required :true}
})

var Account = mongoose.model("Account", accountModel);
module.exports = Account;
