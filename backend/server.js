const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./user").User;
const mongoose = require("mongoose");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: "10mb" }));

app.post("/register", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hashedPass,
      balance: 5000,
    });
    newUser.save().then((res) => console.log("User created"));
  } catch (error) {
    console.log("Something went wrong");
  }
});

app.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .then((res) => {
      req.user = res;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

app.use(async (req, res, next) => {
  const user = req.user[0];
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(["success", user.username]);
    } else {
      res.send(["wrong pass"]);
    }
  } catch (error) {
    res.send(["not registered"]);
  }
});

mongoose
  .connect(
    "mongodb+srv://Chris:Krisi0143171864a@cluster0.d3hu6.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000);
    console.log("Connected to database");
  });
