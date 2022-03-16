var searchEl = document.getElementById("search-input");
var buttonEl = document.getElementById("b-button");
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

        console.log(data);

        var author = [];
        var title = [];
        
        
        for (i = 0; i < 9; i++) {
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

            // entire div box, containing the book and elements within
            var bookbox = document.createElement('div');
            bookbox.className = 'container px-6 py-20 bg-gray-100 m-2 shadow w-full min-w-xl';

            // Book Title and the Author's name
            var header = document.createElement('h2');
            header.className = 'text-2xl font-bold text-center text-gray-800 mb-8'
            header.textContent = title[i] + ' by ' + author[i];

            // book cover element
            var cover = document.createElement('img');
            var image = 'https://covers.openlibrary.org/b/isbn/' + data.docs[i].isbn[0] + '.jpg?default=false'
            cover.src = image;
            cover.className = 'mx-auto rounded-xl text-center';
            cover.alt = title[i] + ' cover art';

            // summary element
            var summary = document.createElement('p');
            var summ = 'https://www.google.com/search?q=' + data.docs[i].isbn[0] + '&';
            console.log
            
            bookbox.appendChild(header);
            bookbox.appendChild(cover);
            outputEl.appendChild(bookbox);
        }

        })
}

buttonEl.addEventListener("click", bookSearch);
