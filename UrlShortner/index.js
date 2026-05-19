const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const urlRoute = require("./routes/url");

const app = express();

const PORT = 8000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use("/", urlRoute);

app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));
