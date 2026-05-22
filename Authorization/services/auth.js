const jwt = require("jsonwebtoken");
const secretKey = "$sumit@123$";

const setUser = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, secretKey);
};

const getUser = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
};

module.exports = { setUser, getUser };
