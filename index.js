const fs = require("fs");

// reading file
// const input = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(input);

// fs.writeFileSync(
//   "./txt/output.txt",
//   `This is my output for the input: ${input}\nCreated at ${new Date().toLocaleDateString()}`
// );

// reading file async.
// non-blocking
// callback hell
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error Reading File 💥");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile(`./txt/append.txt`, "utf-8", (err, append) => {
      fs.writeFile(`./txt/final.txt`, `${data2}\n${append}`, () => {
        console.log("Final file written successfully 😊");
      });
    });
  });
});
