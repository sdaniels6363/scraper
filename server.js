var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var exphbs = require("express-handlebars");

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
var Page = require("./models/goalModel.js");

// Initialize Express
var app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


// Import routes and give the server access to them.
var routes = require("./controllers/goalController.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

// axios.get("https://www.reddit.com/r/LiverpoolFC/")