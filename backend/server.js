const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  User.findOne({ email }).then((user) => {
    if (user) {
      res.send("user already exists");
      console.log("User already exists");
    } else {
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPass,
      });
      newUser
        .save()
        .then((res) => console.log("User created"))
        .catch((err) => console.log(err));
    }
  });
});

app.post("/login", (req, res, next) => {
  let { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) throw err;
        if (res) {
          //send jwt
          console.log("Authenticated");
        } else {
          console.log("Incorrect password");
        }
      });
    } else {
      console.log("This email is not registered!");
    }
  });
});

mongoose
  .connect(
    "mongodb+srv://Chris:Krisi0143171864a@cluster0.d3hu6.mongodb.net/users?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then((res) => {
    app.listen(4000);
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));
