const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.end("Hi from Home page");
});

app.get("/about", (req, res) => {
  return res.end(`Hi from About page ${req.query.name}`);
});

app.listen(8000, () => {
  console.log("Server started!");
});
