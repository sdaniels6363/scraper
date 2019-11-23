$(document).ready(() => {
  
  $("#scraper-btn").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(response => {
      console.log("Scraping complete.");
      console.log(response)
      location.reload();
    });
  });

  $(".comments").on("click",(event)=>{

    console.log("Comments requested.")
    let mediaId = event.currentTarget.dataset.id
    $.ajax({
      method: "POST",
      url: "/comments/retrieve",
      data:{
        id: mediaId
      }
    }).then(response => {
      console.log("Comments delivered.")
    });
  })

  $("#submitComment").on("click", (event)=> {
    event.preventDefault()

    let name = $("#commenterName").val();
    let comment = $("#commenterComment").val();

    $.ajax({
      method: "POST",
      url: "/comments/submit",
      data:{
        name: name,
        comment: comment
      } 
    }).then(response => {
      console.log(response)



    });

  });


});
