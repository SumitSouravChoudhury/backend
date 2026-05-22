const express = require("express");

const {
  handleUserSignup,
  handleUserLogin,
  handleListUsers,
  handleListUserById,
} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

router.get("/", handleListUsers);
router.get("/:userId", handleListUserById);

module.exports = router;
