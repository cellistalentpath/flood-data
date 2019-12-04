var http = require("http");

var hostname = "localhost";
var port = process.env.PORT || 5000;
var formattedEverything = {};

var server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Request-Method", "*");
  // response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  // response.setHeader("Access-Control-Allow-Headers", "*");
  // if (request.method === "OPTIONS") {
  //   response.writeHead(200);
  //   response.end();
  //   return;
  // }
  if (request.method === "POST" && request.url === "/map/formatted") {
    request.on("data", function(chunk) {
      for (id in formattedEverything) {
        if (
          formattedEverything[id].formattedHeld ===
          JSON.parse(chunk.toString()).formattedHeld
        ) {
          formattedEverything[id].totalResidents = JSON.parse(
            chunk.toString()
          ).totalResidents;
        }
      }
      formattedEverything[JSON.parse(chunk.toString()).id] = JSON.parse(
        chunk.toString()
      );
      response.end();
    });
  }
  if (request.method === "GET" && request.url === "/map/formatted") {
    response.write(JSON.stringify(formattedEverything));
    response.end();
  }
  if (request.method === "GET" && request.url === "/map/formatted/reset") {
    formattedEverything = {};
    response.write(formattedEverything);
    response.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
