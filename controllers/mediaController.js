var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  db.Media.find({}).then((data) => {
    res.render("index", { media: data });
  });
});


// A GET route for scraping the /r/LiverpoolFC
router.get("/scrape", (req, res) => {
  // First, we grab the body of the html with axios
  axios.get("http://old.reddit.com/r/LiverpoolFC/new").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every div with a top-matter class, and do the following:
    $(".video").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // filter on just media links
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).parent().children("p").children("a").text();
      result.link = $(this).parent().children("p").children("a").attr("href");

      // append www.reddit.com to links that are just /r/Liverpool...
      if (result.link.includes("/r/LiverpoolFC")) {
        newLink = `https://www.reddit.com${result.link}`;
        result.link = newLink;
      }

      // Create a new Article using the `result` object built from scraping
      db.Media.create(result)
        .then(function (media) {
          // View the added result in the console
          console.log(media)
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.status(200).send("Scrape Complete");
  });
});

router.get("/comments/:id", (req, res) => {

  let mediaId = req.params.id;
  console.log(mediaId);
  db.Media.findById(mediaId)
    .populate("comment")
    .then((media) => {
      console.log(media.comment)
      res.json(media.comment)
    })
});


router.post("/comments/:id", (req, res) => {

  console.log(req.body)

  db.Comment.create(req.body)
    .then((comment) => {
      return db.Media.findOneAndUpdate({_id: req.params.id}, {$push: { comment: comment._id }} , {new: true});
    })
    .then((added)=> res.status(200).send(`Comment added: ${added}`))
    .catch(err => res.status(500).send(err))
});


// Export routes for server.js to use.
module.exports = router;
