const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
const db = require("./controller/connectDb")
const login = require("./controller/login")
const insert = require("./controller/insert")
const verify = require("./controller/verify")
const PORT = process.env.PORT || 3000;
//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

//Database

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running in PORT..," + PORT)
})


app.get('/', (req, res) => {
    console.log("hello world!");
    res.send("API")
})
app.post('/login', (req, res) => {
    console.log(req.body);
    login.login(req.body, res);
})
app.get('/verify/:token', (req, res) => {
    verify.verify(req.params.token, res);
})

app.post('/insert', (req, res) => {
    insert.insert(req.body, res);
})
app.post('/currentpatient',(req,res)=>{
    
})
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkYzE3MjUwNTQ5NTAyMjhjYWM4MzBiNiIsInVzZXJuYW1lIjoiamVzc2EiLCJwYXNzd29yZCI6Inlvc29yZXMifSwiaWF0IjoxNTcyOTU5ODc5fQ.9pOny8d_DQp_rFi7-2nbb2CxxFASvLRa3QWvdLsyOHc