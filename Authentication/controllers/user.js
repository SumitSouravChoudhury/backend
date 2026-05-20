const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");
const { setUser } = require("../services/auth");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(404).json({ error: "Name is required" });
  if (!email) return res.status(404).json({ error: "Email is required" });
  if (!password) return res.status(404).json({ error: "Password is required" });

  await User.create({ name, email, password });

  return res.redirect("/login");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);

  res.cookie("uid", sessionId);

  return res.redirect("/");
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
