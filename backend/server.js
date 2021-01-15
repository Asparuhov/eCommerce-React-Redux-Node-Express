require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://happy-curie-d26fec.netlify.app/",
  })
);

app.get("/user", authenticateToken, (req, res, next) => {
  res.send(req.user);
});

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
        cart: [],
      });
      newUser
        .save()
        .then((res) => console.log("User created"))
        .catch((err) => console.log(err));
    }
  });
});

app.get("/test", (req, res) => {
  User.find({}, (err, result) => {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  })
});

app.post("/login", (req, res, next) => {
  let { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) throw err;
        if (response) {
          console.log(user);
          const accessToken = jwt.sign(
            user.toJSON(),
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ accessToken: accessToken });
          console.log("Authenticated");
          res.send('Authenticated')
        } else {
          console.log("Incorrect password");
          res.send('Incorrect password');
        }
      });
    } else {
      console.log("This email is not registered!");
      res.send('Not registered');
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  console.log(req.headers);
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token === null) {
    res.status(401).send("Error");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) throw err;
    console.log(user);
    req.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    next();
  });
}

app.post("cart", (req, res) => {
  console.log(req.body);
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
    app.listen(process.env.PORT || 4000);
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));
