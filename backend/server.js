const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const User = require("./user").User;
const mongoose = require("mongoose");
app.use(cors("http://localhost:3000"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/register", (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    balance: 5000,
  });
  newUser
    .save()
    .then(() => {
      console.log("User Created");
    })
    .catch((err) => console.log(err));
});


app.post("/login", (req, res, next) => {
    console.log(req.body.password);
    User.find({username: req.body.username}).then((user) => {
      console.log(user);
        if (user[0].password == req.body.password) {
            res.send(user[0].username);
        console.log('Authenticated');
    }else{console.log('Wrong password');}
    });
});

mongoose
  .connect(
    "mongodb+srv://Chris:Krisi0143171864a@cluster0.d3hu6.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000);
    console.log("Connected to database");
  });
