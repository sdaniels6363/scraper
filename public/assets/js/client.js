$(document).ready(() => {
  $("#scraper-btn").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(response => {
      console.log("Scraping complete.");
      location.reload();
    });
  });
});
