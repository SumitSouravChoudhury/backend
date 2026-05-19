const { nanoid } = require("nanoid");

const Url = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  const shortId = nanoid(8);
  if (!body.url) return res.status(400).json({ error: "url is required" });
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.status(201).json({ id: shortId });
};

const handleRedirectUrl = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  res.redirect(entry.redirectUrl);
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
  handleAnalytics,
};
