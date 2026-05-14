const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const PORT = 8000;

const app = express();

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/backend-practice")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true },
);

// Model
const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("hello from Middleware 1");
  req.myUsername = "Sumit";
  next();
});

app.use((req, res, next) => {
  console.log("hello from Middleware 2", req.myUsername);
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "./MongoDb/logs.txt",
    `${Date.now()}: ${req.method} ${req.path}\n`,
    (err, data) => {
      next();
    },
  );
});

// Routes
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "Not found" });

    return res.json(user);
  })
  .patch(async (req, res) => {
    const body = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
      },
      { new: true },
    );

    if (!user) return res.status(404).json({ status: "not found" });

    return res.json({ status: "success", user });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ status: "not found" });

    return res.json({ status: "success" });
  });

// GET
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});

  const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;

  res.send(html);
});

//POST
app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Success" });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
