const express = require("express");

const User = require("../models/user");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
  handleShowUsers,
} = require("../controllers/user");

const router = express.Router();

// GET
router.get("/api/users", handleGetAllUsers);
router.get("/users", handleShowUsers);

//POST
router.post("/api/users", handleCreateUser);

router
  .route("/api/users/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
