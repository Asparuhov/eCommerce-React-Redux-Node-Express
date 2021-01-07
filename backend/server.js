const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./user").User;
const mongoose = require("mongoose");
app.use(cors("http://localhost:3000"));

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
    newUser.save().then(res => console.log('User created'));
  } catch (error) {
    console.log("Something went wrong");
  }
});

app.post("/login", async(req, res, next) => {
  let user = User.find({ username: req.body.username }, (err, docs) => {
    if (err) {
      console.log("not found");
    } else {
      return docs;
    }
  });
  console.log(user);
  if (user == null) {
    res.status(400).send("Cannot find user");
    console.log("User doesn't exist");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Authenticated");
      console.log("Authenticated");
    } else {
      res.send("Wrong password");
      console.log("Wrong password");
    }
  } catch (error) {
    res.send("Something went wrong");
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
