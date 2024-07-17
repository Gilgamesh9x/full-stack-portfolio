require("dotenv").config();
const https = require("https");
const fs = require("fs");
const { mongoConnect } = require("./mongo");
const app = require("./app");

const port = 8000;

const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

async function startServer() {
  await mongoConnect();
  server.listen(port, () => {
    console.log("Listening on port 8000...");
  });
}

startServer();
