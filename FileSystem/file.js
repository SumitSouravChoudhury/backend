const fs = require("fs");

// Write synchronous
// fs.writeFileSync("./FileSystem/text.txt", "Hey there Synchronous");

// Write asynchronous
// fs.writeFile(
//   "./FileSystem/textAsync.txt",
//   " Hey there Asynchronous",
//   (err) => {},
// );

// Read synchronous
// const result = fs.readFileSync("./FileSystem/contacts.txt", "utf-8");
// console.log(result);

// Read asynchronous
// fs.readFile("./FileSystem/contacts.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.error("error", err);
//   } else {
//     console.log(result);
//   }
// });

// Append synchronous
// fs.appendFileSync(
//   "./FileSystem/text.txt",
//   new Date().getDate().toLocaleString(),
// );

// Append asynchronous
// fs.appendFile(
//   "./FileSystem/textAsync.txt",
//   new Date().getDate().toLocaleString(),
//   (err) => {},
// );

// fs.cpSync("./FileSystem/text.txt", "./FileSystem/copy.txt");

// fs.unlinkSync("./FileSystem/copy.txt");
