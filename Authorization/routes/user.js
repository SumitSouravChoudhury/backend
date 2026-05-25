const express = require("express");

const {
  handleUserSignup,
  handleUserLogin,
  handleListUsers,
  handleListUserById,
  handleUpdateUserById,
} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

router.get("/", handleListUsers);

router.route("/:id").get(handleListUserById).patch(handleUpdateUserById);

module.exports = router;
