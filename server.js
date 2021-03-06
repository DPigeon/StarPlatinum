const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// API Data
const DatasAPI = require("./models/data");

// Start an instance of the backend server
const server = express();

// Serve static files from the React server
server.use(express.static(path.join(__dirname, "frontend/build")));

// Allowing requests from the browser
server.use(bodyParser.json()); // for parsing serverlication/json
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// We want to connect to the database
/*mongoose.connect(
  "mongodb+srv://Survive:1vCtFaFXbgQwroc3@cluster0-bpvrp.mongodb.net/hackathon",
  { useNewUrlParser: true }
);*/

server.get("/", function(request, response) {
  response.send("Hello from Wikiuno !");
});

server.get("/api/hackathon", function(request, response) {
  // Gets all the scores (we only need that)
  DatasAPI.getData(function(error, data) {
    if (error) {
      throw error;
    }
    response.json(data); // Receive the Data
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

const PORT = process.env.PORT || 4000;

server.listen(PORT);
console.log(`Backend running on port ${PORT}.`);
