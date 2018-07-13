$(document).ready(function() {

    var movies = [
        "Billy Madison", "Happy Gilmore", "Dumb and Dumber", "Anchor Man", "Zoolander","Old School", 
        "Tommy Boy", "Wayne's World", "Austin Powers", "Dodgeball", "Super Troopers", "Beerfest", 
        "Office Space", "Ace Ventura", "Robin Hood Men in Tights", "Superbad", "Napoleon Dynamite", "Animal House", "Team America"
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".movie-button", function() {
      $("#movies").empty();
      $(".movie-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var movieDiv = $("<div class=\"movie-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var movieImage = $("<img>");
            movieImage.attr("src", still);
            movieImage.attr("data-still", still);
            movieImage.attr("data-animate", animated);
            movieImage.attr("data-state", "still");
            movieImage.addClass("animal-image");
  
            movieDiv.append(p);
            movieDiv.append(movieImage);
  
            $("#movies").append(movieDiv);
          }
        });
    });
  
    $(document).on("click", ".movie-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-movie").on("click", function(event) {
      event.preventDefault();
      var newMovie = $("input").eq(0).val();
  
      if (newMovie.length > 2) {
        movies.push(newMovie);
      }
  
      populateButtons(movies, "movie-button", "#movie-buttons");
  
    });
  
    populateButtons(movies, "movie-button", "#movie-buttons");
});
  



/*$(document).ready(function() {

    var movies = [
        "Billy Madison", "Happy Gilmore", "Dumb and Dumber", "Anchor Man", "Zoolander", "Old School", "Tommy Boy", "Wayne's World", "Austin Powers", "Dodgeball", "Super Troopers", "Beerfest", "Office Space", "Ace Ventura", "Robin Hood Men in Tights", "Superbad", "Napoleon Dynamite", "Animal House", "Team America" 
    ];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    $(document).on("click", ".movie-button", function() {
        $("#movies").empty();
        $(".movies-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div class=\"movie-item\">");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var movieImage = $("<img>");
                movieImage.attr("src", still);
                movieImage.attr("data-still", still);
                movieImage.attr("data-animate", animated);
                movieImage.attr("data-state", "still");
                movieImage.addClass("movie-image");

                movieDiv.append(p);
                movieDiv.append(movieImage);

                $("#movies").append(movieDiv);
            }
        });
    });

    $(document).on("click", ".movie-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("input").eq(0).val();

        if (newMovie.length > 2) {
            movies.push(newMovie);
        }

        populateButtons(movies, "movie-button", "#movie-buttons");

    });

    populateButtons(movies, "movie-button", "#movie-buttons");

})*/