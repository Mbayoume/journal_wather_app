// Require Express to run server and routes

const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Setup Server
// creat server port using the listen method and log a message to test the server is working
const port = 8080;

// testing the server
function listening() {
  console.log(`listening to the port ${port}`);
}
// starting the server
app.listen(port, listening);

// GET rout
app.get("/getData", (req, res) => {
  res.send(projectData);
  projectData = req.body;
});

// POST route

app.post("/postData", (req, res) => {
  projectData = req.body;
  res.send(projectData);
  console.log(projectData);
});
