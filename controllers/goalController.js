var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var goal = require("../models/goalModel.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // goal.all(function(data) {
    res.render("index");
  // });
});

// Export routes for server.js to use.
module.exports = router;
