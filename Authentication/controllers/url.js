const { nanoid } = require("nanoid");

const Url = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  const shortId = nanoid(8);
  if (!body.url) res.status(400).json({ error: "url is required" });
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortId });
};

const handleRedirectUrl = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { returnDocument: "before" },
  );
  if (!entry) return res.status(404).json({ error: "Short URL not found" });
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
