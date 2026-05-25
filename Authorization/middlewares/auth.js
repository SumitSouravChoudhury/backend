const { getUser, setUser } = require("../services/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.uid;
  req.user = null;

  if (!tokenCookie) {
    return next();
  }

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;

  next();
};

const restrictTo = (roles = []) => {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.status(401).json({ error: "Unauthorized" });

    return next();
  };
};

module.exports = { checkForAuthentication, restrictTo };
