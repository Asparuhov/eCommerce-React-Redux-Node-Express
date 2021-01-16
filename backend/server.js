require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
const mailer = require("nodemailer");
app.use(express.json());
app.use(cors());

app.get("/user", authenticateToken, (req, res, next) => {
  res.send(req.user);
});

const transporter = mailer.createTransport({
  service: "hotmail",
  auth: {
    user: "ecommerce-chris@outlook.com",
    pass: "Krisi0143171864a",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
app.post("/email", (req, res) => {
  const itemsInfo = req.body.content.itemsInfo;
  const totalPrice = req.body.content.totalPrice;
  const { name, email, address } = req.body.userInfo;
  let arrayItems = "";
  let n;
  for (n in itemsInfo) {
    arrayItems += "<li>" + itemsInfo[n] + "</li>";
  }
  const config = {
    from: "ecommerce-chris@outlook.com",
    to: email,
    subject: "Test Order",
    html: `<h2>Details for Order#${Math.floor(
      Math.random() * Math.floor(100)
    )}:</h2>
      <p>Name of reciever: <strong> ${name} </strong></p>
      <p>Order will be delivered at <strong> ${address} </strong> in 7 business days!</p>
              <strong><ul>${arrayItems},</ul></strong>
              <h3>Final price with fees: $${totalPrice}</h3>`,
  };
  transporter.sendMail(config, (err, result) => {
    if (err) throw err;
    if (result) {
      console.log("email sent");
    }
  });
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
  });
});

app.post("/login", (req, res, next) => {
  let { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) throw err;
        if (response) {
          const accessToken = jwt.sign(
            user.toJSON(),
            "2150b00546dd908c7357b9ff597711128cd6"
          );
          res.json({ accessToken: accessToken });
        }
      });
    } else {
      console.log("This email is not registered!");
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token === null) {
    res.status(401).send("Error");
  }
  jwt.verify(token, "2150b00546dd908c7357b9ff597711128cd6", (err, user) => {
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

app.post("/cart", (req, res) => {
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
