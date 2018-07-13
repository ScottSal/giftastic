$(document).ready(function() {

  lastClick = [];
  
    
  var comedyGifs = {
  
    comedySearches: ["Billy Madison", "Happy Gilmore", "Dumb and Dumber", "Anchor Man", "Zoolander","Old School", 
    "Tommy Boy", "Wayne's World", "Austin Powers", "Dodgeball", "Super Troopers", "Beerfest", 
    "Office Space", "Ace Ventura", "Robin Hood Men in Tights", "Superbad", "Napoleon Dynamite", "Animal House", "Team America"],
  
    buttonLoop: function() {
      for (var b = 0; b < comedyGifs.comedySearches.length - 1; b++) {
        var buttonM = $("<button class='dynGen'>").text(comedyGifs.comedySearches[b]).attr("data-index", comedyGifs.comedySearches[b]);
        $("#buttons").append(buttonM);
      }
    },
  
    divLoop: function(click) {
  
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=B26sstJns2pZuNT5HiJpqS5FV8Su1sDd&q=" + lastClick + "&limit=10"
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
  
        
          for (var i = 0; i < response.data.length; i++) {
            var respData = response.data[i];
            var image = respData.images.fixed_height_still.url;
          var gif = respData.images.fixed_height.url;
            var rating = respData.rating;
  
            var dynDiv = $("<div class='dyn-div'>");
  
            var comedyImg = $("<img class='still-image'>");
  
            comedyImg.attr("src", image);
            comedyImg.attr("alt", "Comedy Movie still frame of gif");
            comedyImg.attr("data-gif", gif);
            comedyImg.attr("class", "comedyImg");
            comedyImg.attr("data-index", i);
            comedyImg.attr("data-img", image);
  
            dynDiv.append("<p> Rating: " + rating + "</p>");
            dynDiv.append(comedyImg);
  
            $("#append-img-div").prepend($(dynDiv));
        };
  
          });
      },
    userPush: function () {
         var userInput = $("input[type='text']").val().trim();
          //console.log(userInput);
          comedyGifs.comedySearches.push(userInput);
          var buttonU = $("<button class='dynGen'>").text(userInput).attr("data-index", userInput);
          $("#buttons").append(buttonU);
          //console.log(comedyGifs.comedyearches);
      }
  };
  
  comedyGifs.buttonLoop();
  
  $("#comedy-add-submit").on("click", function(event) {
    event.preventDefault();
    comedyGifs.userPush();
  });
  
  $(document).on("click", "button.dynGen", function(event) {
      var currentIndex = $(this).attr("data-index");
    lastClick.push(currentIndex);
    //console.log(currentIndex);
    event.preventDefault();
    $("#append-img-div").empty();
    comedyGifs.divLoop();
    lastClick = [];
  });
    
  $(document).on("click", ".comedyImg", function(event) {
    //console.log("test");
    var currentIn = $(this).attr("data-index");
    var tempUrl = $(this).attr("data-gif");
    var tempUrl2 = $(this).attr("data-img");
    //console.log(currentIn);
    //console.log(tempUrl);
    if ($(this).attr("src") == tempUrl2) {
  
    $(this).attr("src", tempUrl);
    }
    else if ($(this).attr("src") == tempUrl) {
    $(this).attr("src", tempUrl2);
    };
  });
});
