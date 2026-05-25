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

  if (!user) return res.redirect("/login");

  const token = setUser(user);
  res.cookie("uid", token);

  return res.redirect("/");
};

const handleListUsers = async (req, res) => {
  const allUsers = await User.find({});

  if (!allUsers) return res.status(400).json({ error: "No users" });

  return res.status(200).json({ allUsers });
};

const handleListUserById = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) return res.status(400).json({ error: "User does not exist" });

  return res.status(200).json({ user });
};

const handleUpdateUserById = async (req, res) => {
  const body = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
      },
    },
    { returnDocument: "after" },
  );

  if (!user) return res.status(404).json({ error: "Not found" });

  return res.status(200).json({ msg: "Updated successfully" });
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleListUsers,
  handleListUserById,
  handleUpdateUserById,
};
