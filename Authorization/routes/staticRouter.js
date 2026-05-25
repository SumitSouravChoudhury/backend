const express = require("express");

const Url = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/", restrictTo(["ADMIN", "NORMAL"]), async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const allUrls = await Url.find({ createdBy: req.user._id });
  res.render("home", { urls: allUrls });
});

router.get("/admin/url", restrictTo(["ADMIN"]), async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const allUrls = await Url.find();
  res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
