const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
const db = require("./controller/connectDb");
const login = require("./controller/login");
const insert = require("./controller/insert");
const verify = require("./controller/verify");
const PatientDetails = require("./models/patients");
const MedicalRecords = require("./models/records");
const Account = require("./models/account");

const PORT = process.env.PORT || 4000;
//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

//Database

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running in PORT..," + PORT);
});

app.get("/", (req, res) => {
  console.log("hello world!");
  res.send("API");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  let usernamei = req.body.username;
  let passwordi = req.body.password;
  Account.findOne({ username: usernamei }, function(err, dbres) {
    if (err) {
      res.send({
        status: false,
        sms: err
      });
    } else {
      if (dbres != null) {
        if (passwordi == dbres.password) {
          res.send({ status: true, sms: "success", user: dbres
        
         });
        } else {
          res.send({ status: false, sms: "Wrong Password" });
        }
      }else{
        res.send({status: false, sms: "Username Not Found"})
      }
    }
  });
});

app.post("/updatePassword/:id",(req,res)=>{
  let id = req.params.id
  let newpass = req.body
  Account.findByIdAndUpdate(id, newpass,(err,resp)=>{
    if (err) {
      res.send({
        status: false,
        sms: err
      });
    }else{
      res.send({
        status: true,
        sms: "updated successfully!!",
        dbres:resp
      });
    }
  })
})

app.get("/verify/:token", (req, res) => {
  verify.verify(req.params.token, res);
});

app.post("/insert", (req, res) => {
  insert.insert(req.body, res);
});

//Patients
app.get("/patient/retrieve", (req, res) => {
  PatientDetails.find(
    {},
    { fname: 1, lname: 1, age: 1, currentdate: 1 },
    (err, data) => {
      if (err) {
        return res.status(404).send("Error while getting list of patients!");
      }
      return res.send({ data });
    }
  );
});

app.get("/patient/:id", (req, res) => {
  let id = req.params.id;
  PatientDetails.findById(id, (err, dbres) => {
    if (err) {
      return res.status(404).send("Error while getting list of patients!");
    }
    return res.send({ info: dbres });
  });
});

app.post("/patient/create", (req, res) => {
  console.log("test patient add");

  const data = new PatientDetails(req.body);
  console.log("data: ", data);
  data.save((err, dbres) => {
    if (err) return res.status(404).send({ message: err.message });
    console.log(dbres);
    return res.send({ info: dbres, status: true });
  });
});

app.post("/patient/update/:id", (req, res) => {
  let id = req.params.id;
  let updateInfo = req.body;
  PatientDetails.findByIdAndUpdate(id, updateInfo, (err, dbres) => {
    if (err) return res.status(404).send({ error: err.message });
    return res.send({ message: "Service is successfully updated", dbres });
  });
});

app.post("/patient/delete/:id", (req, res) => {
  PatientDetails.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(404).send({ error: err.message });
    return res.send({ message: "Service is successfully deleted!", data });
  });
});

//records
app.get("/record/:id", (req, res) => {
  console.log("getting records");
  let id = req.params.id;
  MedicalRecords.find({ ownerID: id }, (err, dbres) => {
    if (err) {
      return res.status(404).send("Error while getting records!");
    }
    console.log("ljdgn", dbres);
    return res.send({ info: dbres });
  });
});
app.post("/record/create", (req, res) => {
  console.log("adding records");
  const data = new MedicalRecords(req.body);
  console.log("adding data: ", data);
  data.save((err, dbres) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ dbres });
  });
});

// Users
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  Account.findById(id, (err, dbres) => {
    if (err) {
      return res.status(404).send("Error while getting list of User!");
    }
    return res.send({ info: dbres });
  });
});

app.post("/user/create", (req, res) => {
  console.log("adding records");
  const data = new Account(req.body);
  console.log("adding data: ", data);
  data.save((err, dbres) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ dbres });
  });
});
app.get("/getusers",(req,res)=>{
  Account.find({},(err,dbres)=>{
    if(err){
      return res.send({error:err, status: false})
    }else{
      return res.send({ status: true,data:dbres})

    }
  })
})
app.post("/user/update/:id", (req, res) => {
  let id = req.params.id;
  let updateInfo = req.body;
  Account.findByIdAndUpdate(id, updateInfo, (err, dbres) => {
    if (err) return res.status(404).send({ error: err.message });
    return res.send({ message: "User is successfully updated", dbres });
  });
});

app.post("/user/delete/:id", (req, res) => {
  Account.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(404).send({ error: err.message });
    return res.send({ message: "User is successfully deleted!", data });
  });
});