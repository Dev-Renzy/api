const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var recordsModel = new Schema({
    title: {type: String, required:true},
    findings: {type: String, required:true},
    date: {type: String, required:true},   
});

var RecordModel = mongoose.model("CurentPatient", recordsModel);
module.exports = RecordModel;