const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var currentpatientModel = new Schema({
    patientID:{type: String, required:true},
    name: {type: String, required:true},
    age: {type: String, required:true},
    date: {type: String, required:true}
});

var CurentPatient = mongoose.model("CurentPatient", currentpatientModel);
module.exports = CurentPatient;