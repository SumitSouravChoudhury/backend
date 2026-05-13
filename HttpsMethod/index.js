const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const log = `${Date.now()}: ${req.url} ${req.method} New request recieved\n`;
  fs.appendFile("./HttpsMethod/log.txt", log, (err, data) => {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    switch (myUrl.pathname) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        res.end("About page");
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Hi, here is your result for " + search);
        break;
      default:
        res.end("404 not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server started!");
});
