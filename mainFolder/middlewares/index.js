const fs = require("fs");

function logReqres(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${new Date().toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 })}: ${req.method} ${req.path}\n`,
      (err) => {
        if (err) console.error("Log write error:", err);
        next();
      },
    );
  };
}

module.exports = { logReqres };
