var searchEl = document.getElementById("search-input");
var buttonEl = document.getElementById("button");
var outputEl = document.getElementById("output")

var bookSearch = function() {
    var book = searchEl.value;
    var input = book.replaceAll(" ", '+');

    var requestUrl = 'http://openlibrary.org/search.json?q=' + input;
    console.log(requestUrl);

    var author = [];
    var title = [];

    fetch(requestUrl) 
        .then(function(response) {
        return response.json();
    })
        .then(function(data) {
        // Checks if something is already in the output zone
        while (outputEl.firstChild) {
            outputEl.removeChild(outputEl.firstChild);
        }

        if (typeof data.docs[i].author_name !== 'undefined') {
            author.push(data.docs[i].author_name);
        }
        else {
            author.push('Unknown');
        }

        if (typeof data.docs[i].subtitle !== 'undefined') {
            title.push(data.docs[i].title + ':' + data.docs[i].subtitle);
        }
        else {
            title.push(data.docs[i].title);
        }

        console.log(data);
        for (i = 0; i < 9; i++) {
            var requestUrl2 = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + data.docs[i].isbn[0];
            console.log(requestUrl2);
        }
        })


}

buttonEl.addEventListener("click", bookSearch);