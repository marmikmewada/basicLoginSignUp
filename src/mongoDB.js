const mongoose = require("mongoose");

//login schema
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection1", loginSchema);

mongoose.connect("mongodb://127.0.0.1:27017/loginSignUp").then(() => {
    console.log("mongo connected");
  }).catch((err) => {
    console.log(err);
  });

module.exports = collection;
