// On page load, run a function that holds the entire application and all its logic // 

$(document).ready(function () {

var nChars = [
    "Mario", "Princess Peach","Link", "Gannon", "Midna", "Kirby",
    "Samus", "Wario", "Waluigi", "Captain Falcon", "Charmander",
    "Pikmin", "Olimar", "Lakitu", "Donkey Kong", "Funky Kong"
];

// Function to create buttons //

function btnGen(cArray, aClass, nArea) {
    $(nArea).empty();

    for (var i = 0; i < cArray.length; i++) {
      var ninC = $("<button>");
      ninC.addClass(aClass);
      ninC.attr("data-type", cArray[i]);
      ninC.text(cArray[i]);
      $(nArea).append(ninC);
    }

  }

  // Emptying the Char Display container to make way for next giphs //
  
  $(document).on("click", ".Char-button", function() {
    $("#character-display").empty();
    $(".Char-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=Ektv7VURvd04TVYwRqFg4RtEISSXJ6My&limit=10";


  // ajax call // 

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

// Iterating over results and creating a new div for each //

        for (var i = 0; i < results.length; i++) {
          var charDiv = $("<div class=\"charGif\">");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          var charImg = $("<img>");
          
          
// Creating data attributes adding them to CharImg and appending to the CharDiv variable which will be appended to the character-display div //
          
          charImg.attr("data-animate", animated);
          charImg.attr("data-state", "still");
          charImg.addClass("char-img");
          charImg.attr("src", still);
          charImg.attr("data-still", still);
          charDiv.append(p);
          charDiv.append(charImg);
          $("#character-display").append(charDiv);
        }
      });
  });


// Logic for changing giph motion state //

  $(document).on("click", ".char-img", function() {

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

  $("#add-character").on("click", function(event) {
    event.preventDefault();
    var addedChar = $("input").eq(0).val();

    if (addedChar.length > 2) {
      nChars.push(addedChar);
    }

// Function calls //    

btnGen(nChars, "Char-button", "#character-buttons");

  });

btnGen(nChars, "Char-button", "#character-buttons");
});
