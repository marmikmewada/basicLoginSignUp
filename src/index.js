const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongoDB.js");
const bodyParser = require("body-parser");
// const collection = require("./mongoDB/js");
// in order to render files we need to require hbs file
const templatePath = path.join(__dirname, "../templates");
const hbs = require("hbs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
// hbs ends here

//routes
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
//authorization
app.post("/login", async (req, res) => {});
app.post("/signup/v1/signup", async (req, res) => {
  // console.log(req.body.name)
  // console.log(req.body.password)
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  // console.log(data.name)
  // console.log(data.password)
  await collection.insertMany([data]);
  res.render("home");
});
app.post("/login/v1/login", async (req, res) => {
  const name = await collection.findOne({name:req.body.name});
  if(name.password === req.body.password){
    res.render("home");
  }else{
    res.send("wrong password");
  }
});
app.listen(3000, () => {
  console.log("server running");
});
