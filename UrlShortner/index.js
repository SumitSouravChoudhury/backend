const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const Url = require("./models/url");

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));
