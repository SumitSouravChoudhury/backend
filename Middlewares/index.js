const express = require("express");
const fs = require("fs");
const path = require("path");

const MOCK_DATA_PATH = path.join(__dirname, "../RestApi/MOCK_DATA.json");
const users = require("../RestApi/MOCK_DATA.json");

const PORT = 8000;

const app = express();

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
    "./Middlewares/logs.txt",
    `${Date.now()}: ${req.method} ${req.path}\n`,
    (err, data) => {
      next();
    },
  );
});

// Routes
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) return res.status(404).json({ status: "not found" });

    users[index] = { ...users[index], ...req.body };

    fs.writeFile(MOCK_DATA_PATH, JSON.stringify(users), (err) => {
      return res.json({ status: "success", user: users[index] });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) return res.status(404).json({ status: "not found" });

    users.splice(index, 1);

    fs.writeFile(MOCK_DATA_PATH, JSON.stringify(users), (err) => {
      return res.json({ status: "success" });
    });
  });

// GET
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

  res.send(html);
});

//POST
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile(MOCK_DATA_PATH, JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server started at Port: ${PORT}`);
});
