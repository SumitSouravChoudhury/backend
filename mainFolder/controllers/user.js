const User = require("../models/user");

// Get all users
const handleGetAllUsers = async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
};

// Get user by id
const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ error: "Not found" });

  return res.json(user);
};

// Create new user
const handleCreateUser = async (req, res) => {
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
};

// Update user by id
const handleUpdateUserById = async (req, res) => {
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
};

// Delete user by id
const handleDeleteUserById = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return res.status(404).json({ status: "not found" });

  return res.json({ status: "success" });
};

// List user in the browser
const handleShowUsers = async (req, res) => {
  const allDbUsers = await User.find({});

  const html = `
        <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
        </ul>
        `;

  res.send(html);
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
  handleShowUsers,
};
