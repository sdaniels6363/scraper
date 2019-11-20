var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  db.Video.find({}).then((data) => {
    res.render("index", {video: data});
  });
});


// A GET route for scraping the echoJS website
router.get("/scrape", (req, res) => {
  // First, we grab the body of the html with axios
  axios.get("http://old.reddit.com/r/LiverpoolFC/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    
    // Now, we grab every h2 within an article tag, and do the following:
    $(".top-matter").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("p").children("a").text();
      result.link = $(this).children("p").children("a").attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Video.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

router.get("/vidoes/", (req, res) => {

})

// Export routes for server.js to use.
module.exports = router;
