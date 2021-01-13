const express = require("express");

const app = express();

const posts = [
  {
    name: "Chris",
    title: "Post1",
  },
  {
    name: "Chris1",
    title: "Post2",
  },
];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.listen(4000);
