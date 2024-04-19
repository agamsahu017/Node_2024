const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  fs.readFile("index.html", function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Error : file not found");
    } else {
      res.write(data);
    }
    res.end();
  });
  // res.write("<h1>hello dear agam</h1>")
  
});

server.listen(port, (error) => {
  if (error) {
    console.log("something is not working ", error);
  }
  console.log("server is running on port ", +3000);
});
