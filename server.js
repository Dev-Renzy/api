const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
const db = require("./controller/connectDb");
const login = require("./controller/login");
const insert = require("./controller/insert");
const verify = require("./controller/verify");
const patients = require("./models/patients");
const records = require("./models/records");

const PORT = process.env.PORT || 3000;
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
  login.login(req.body, res);
});
app.get("/verify/:token", (req, res) => {
  verify.verify(req.params.token, res);
});

app.post("/insert", (req, res) => {
  insert.insert(req.body, res);
});

//Patients
app.get("/patient/retrieve", (req, res) => {
  patients.find({}, (err, data) => {
    if (err) {
      return res.status(404).send("Error while getting list of services!");
    }
    return res.send({ data });
  });
});

app.post("/patient/create", (req, res) => {
  const data = new patients({
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    sex: req.body.sex,
    status: req.body.status,
    age: req.body.age,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    emercontfname: req.body.emercontfname,
    emercontmname: req.body.emercontmname,
    emercontlname: req.body.emercontlname,
    emercontnumber: req.body.emercontnumber,
    emercontaddress: req.body.emercontaddress,
    emercontemail: req.body.emercontemail,
    relationship: req.body.relationship
  });
  data.save(err => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ data });
  });
});

app.post("/patient/update/:id",(req, res) => {
  console.log(req.body);
  patients.findByIdAndUpdate(
    req.params.id,//from database
    req.body,//from the front end
    { new: true },
    (err, data) => {
      if (err) return res.status(404).send({ error: err.message });
      return res.send({ message: "Service is successfully updated", data });
    }
  );
});

app.post('/patient/delete/:id', (req, res) => {
    patients.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})

//records
app.get("/record/retrieve", (req, res) => {
    records.find({}, (err, data) => {
      if (err) {
        return res.status(404).send("Error while getting list of services!");
      }
      return res.send({ data });
    });
  });

app.post("/record/create", (req, res) => {
    const data = new records({
        title: req.body.title,
        findings: req.body.findings,
        date: req.body.date
    });
    data.save(err => {
      if (err) return res.status(404).send({ message: err.message });
      return res.send({ data });
    });
  });
  
  app.post("/record/update/:id",(req, res) => {
    console.log(req.body);
    records.findByIdAndUpdate(
      req.params.id,//from database
      req.body,//from the front end
      { new: true },
      (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: "Service is successfully updated", data });
      }
    );
  });
  
  app.post('/record/delete/:id', (req, res) => {
    records.findByIdAndRemove(req.params.id, (err, data) => {
          if (err) return res.status(404).send({ error: err.message });
          return res.send({ message: 'Service is successfully deleted!', data })
      })
  })
  



