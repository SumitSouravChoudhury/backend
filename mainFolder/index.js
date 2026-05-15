const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const router = require("./routes/index");
const { logReqres } = require("./middlewares/index");

const PORT = 8000;

const app = express();

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/backend-practice")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqres(path.join(__dirname, "logs.txt")));

// Routes
app.use("/", router);

// Listen
app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
