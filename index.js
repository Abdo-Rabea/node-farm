const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

// . here refers to current directory (just as __dirname) and not the localtion where we run the application from.
const replaceTemplate = require('./modules/replaceTemplate');
///////////////////////////////////////////////////////////////////////////
// Dealing with files
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
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error Reading File 💥");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, append) => {
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${append}`, () => {
//         console.log("Final file written successfully 😊");
//       });
//     });
//   });
// });

/////////////////////////////////////////////////////////////////////////
// Creating our first server
// you can write hear blocking code as it will run only once when the server starts.
// * note: the server callback is the only that is called once for each request
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const dataObj = JSON.parse(data);

// testing slugify
const slugs = dataObj.map((product) =>
  slugify(product.productName, { replacement: '-', lower: true })
);
console.log(slugs);

const server = http.createServer((req, res) => {
  const { pathname: pathName, query } = url.parse(req.url, true);
  // overview
  if (pathName === '/' || pathName === '/overview') {
    const cardsHtml = dataObj
      .map((product) => replaceTemplate(tempCard, product))
      .join('');

    const overviewHtml = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(overviewHtml);
  }
  // api
  else if (pathName === '/api') {
    res.writeHead(200, {
      // you give the browser the type of returned data and it deals with it the write way (simple usecase: pretty-print)
      'Content-type': 'application/json',
    });
    res.end(data);
  }
  // product
  else if (pathName === '/product') {
    const product = dataObj[query.id];
    const productHtml = replaceTemplate(tempProduct, product);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(productHtml);
  }
  // Not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello - world',
    });
    res.end('<h1>Page not found!<h1>');
  }
});

// tell the server the host and port (think of it... the http needs this and it will do all the rest)
server.listen(8000, '127.0.0.1', () => console.log('start listening'));
