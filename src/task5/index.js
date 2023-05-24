const http = require("http");
const router = require("./router");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  router.processRoute(url, method, req, res);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});