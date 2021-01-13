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
  const salt =  await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPass
  });
  newUser
    .save()
    .then((res) => console.log("User created"))
    .catch((err) => console.log(err));
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
