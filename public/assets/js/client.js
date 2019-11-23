$(document).ready(() => {
  
  $("#scraper-btn").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(response => {
      $("#postComments").empty();
      console.log("Scraping complete.");
      console.log(response)
      location.reload();
    });
  });

  $(".comments").on("click",(event)=>{
    event.preventDefault()
    
    $("#postComments").empty();
    
    console.log("Comments requested.")
    mediaId = event.currentTarget.dataset.id
    console.log(mediaId)

    $.ajax({
      method: "GET",
      url: `/comments/${mediaId}`
    }).then(response => {
      console.log("Comments delivered.")
      console.log(response)

      response.map(comment => {
        let html = `
        <div class="comment-card">
          <h4 class="card-title">${comment.name}</h4>
          <p>${comment.comment}</p>
        </div>
        `
        $("#postComments").append(html);
      })


      
    });
  })

  $("#submitComment").on("click", (event)=> {
    event.preventDefault()

    console.log(event)
    let name = $("#commenterName").val();
    let comment = $("#commenterComment").val();

    console.log(mediaId)

    $.ajax({
      method: "POST",
      url: `/comments/${mediaId}`,
      data:{
        name: name,
        comment: comment
      } 
    }).then(response => {
      console.log(response)

      $("#commenterName").val("")
      $("#commenterComment").val("")

    });

  });


});
