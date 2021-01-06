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
  User.find({ username: req.body.username })
    .then((user) => {
      if (user.length !== 0) {
        if (user[0].password == req.body.password) {
          req.user = user;
          console.log("Authenticated");
          res.send(req.user);
        } else {
          console.log("Wrong password");
        }
      } else {
        res.send("User not registered!");
      }
    })
    .catch((err) => console.log(err));
});

mongoose
  .connect(
    "mongodb+srv://Chris:Krisi0143171864a@cluster0.d3hu6.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000);
    console.log("Connected to database");
  });
