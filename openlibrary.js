var searchEl = document.getElementById("search-input");
var buttonEl = document.getElementById("button");
var outputEl = document.getElementById("output")

var bookSearch = function() {
    var book = searchEl.value;
    var input = book.replaceAll(" ", '+');

    var requestUrl = 'http://openlibrary.org/search.json?q=' + input;
    console.log(requestUrl);

    fetch(requestUrl)
        .then(function(response) {
        return response.json();
    })
        .then(function(data) {
        // Checks if something is already in the output zone
        while (outputEl.firstChild) {
            outputEl.removeChild(outputEl.firstChild);
        }

        console.log(data)

        

        })
}

buttonEl.addEventListener("click", bookSearch);