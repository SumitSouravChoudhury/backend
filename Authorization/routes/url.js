const express = require("express");

const {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
  handleAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortId", handleAnalytics);

router.get("/:shortId", handleRedirectUrl);

module.exports = router;
