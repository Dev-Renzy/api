const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var patientModel = new Schema({
    fname: {type: String, required:true},
    mname: {type: String, required:true},
    lname: {type: String, required:true},
    sex:   {type: String, required:true},
    status:{type: String, required:true},
    age:   {type: String, required:true},
    address: {type: String, required:true},
    email: {type: String},
    contact: {type: String, required:true},
    emercontfname: {type: String, required:true},
    emercontmname: {type: String, required:true},
    emercontlname: {type: String, required:true},
    emercontnumber: {type: String, required:true},
    emercontaddress: {type: String, required:true},
    emercontemail: {type: String},
    relationship: {type: String, required:true},
    currentdate:{type: Date, required:true}
});

var PatientDetails = mongoose.model("PatientDetails", patientModel);
module.exports = PatientDetails;