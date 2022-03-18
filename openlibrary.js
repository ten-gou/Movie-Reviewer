var searchEl = document.getElementById("search-input");
var buttonEl = document.getElementById("b-button");
var outputEl = document.getElementById("output");
var resultsPageNumber = 0;
var results = 10;
var undef


var bookSearch = function() {
    var book = searchEl.value;
    var input = book.replaceAll(" ", '+');
    var requestUrl = 'http://openlibrary.org/search.json?q=' + input;
    var resultsPageTotal = resultsPageNumber * 10;
    console.log(resultsPageNumber)
    console.log(resultsPageTotal)

    var topSearch = document.createElement('div');
    topSearch.className = 'flex justify-center bg-gray-200';
    var botSearch = document.createElement('div');
    botSearch.className = 'flex justify-center bg-gray-200';
    var searchOutput = document.createElement('section');

    var author = [];
    var title = [];

    fetch(requestUrl) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            // Checks if something is already in the output zone
            while (outputEl.firstChild) {
                outputEl.removeChild(outputEl.firstChild);
            }
            for (i = 0 + resultsPageTotal; i < results + resultsPageTotal; i++) {
                console.log(i + ',' + resultsPageNumber * 10);
                if (typeof data.docs[i].isbn[0] !== 'undefined' || typeof data.docs[i].isbn[0] !== null || data.docs[i].isbn[0] || !data.docs[i].isbn[0] || data.docs[i].isbn[0] !== undef) {
                    var requestUrl2 = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + data.docs[i].isbn[0];
                    console.log(requestUrl2);
                    fetch(requestUrl2)        
                        .then(function(response) {
                    return response.json();
                        })
                        .then(function(data) {
                    console.log(data)
                        if (data.totalItems > 0) {
                            if (typeof data.items[0].volumeInfo.authors[0] !== 'undefined') {
                                author.push(data.items[0].volumeInfo.authors[0]);
                            }
                            else {
                                author.push('Unknown');
                            }
                
                            if (typeof data.items[0].volumeInfo.subtitle !== 'undefined') {
                                title.push(data.items[0].volumeInfo.title + ': ' + data.items[0].volumeInfo.subtitle);
                            }
                            else {
                                title.push(data.items[0].volumeInfo.title);
                            }

                            // entire div box, containing the book and elements within
                            var bookbox = document.createElement('div');
                            bookbox.className = 'container px-6 py-20 bg-gray-100 m-2 shadow w-full min-w-xl';
                            
                            // Book Title and the Author's name
                            var header = document.createElement('h2');
                            header.className = 'text-2xl font-bold text-center text-gray-800 mb-8'
                            for (p = 0; p < title.length; p++) {
                                header.textContent = title[p] + ' by ' + author[p];
                            }

                            // book cover element
                            var cover = document.createElement('img');
                            if (typeof data.items[0].volumeInfo.imageLinks.thumbnail !== 'undefined') {
                                cover.src = data.items[0].volumeInfo.imageLinks.thumbnail;
                            }
                            else if (typeof data.items[0].volumeInfo.imageLinks.smallThumbnail !== 'undefined') {
                                cover.src = data.items[0].volumeInfo.imageLinks.smallThumbnail;
                            }
                            else {
                                cover.src = './assets/images/Placeholder.png'
                            }
                            cover.className = 'mx-auto rounded-xl text-center';
                            cover.alt = title[i] + ' cover art';

                            // Book Description Element
                            var summary = document.createElement('div');
                            if (data.items[0].volumeInfo.description !== 'undefined') {
                            summary.textContent = data.items[0].volumeInfo.description;
                            }
                            else {
                                console.log('Unable to obtain a description!');
                            }

                            bookbox.appendChild(header);
                            bookbox.appendChild(cover);
                            bookbox.appendChild(summary);
                            searchOutput.appendChild(bookbox);
                        }
                        else {
                            console.log("Insufficient information")
                        }
                    
                        })
                }
            }
            for (i = 0; i < (Math.ceil(data.docs.length / 10)); i++) {
                var otherResults = document.createElement('button');
                otherResults.className = 'text-gray-800 bg-gray-300 m-2 rounded-lg p-2';
                otherResults.setAttribute('number', Math.ceil(data.docs.length / 10));
                otherResults.textContent = i + 1;
                otherResults.setAttribute("onclick", 'nextSearch(this)')

                botSearch.appendChild(otherResults);
            }

            for (i = 0; i < (Math.ceil(data.docs.length / 10)); i++) {
                var otherResults = document.createElement('button');
                otherResults.className = 'text-gray-800 bg-gray-300 m-2 rounded-lg p-2';
                otherResults.setAttribute('number', Math.ceil(data.docs.length / 10));
                otherResults.textContent = i + 1;
                otherResults.setAttribute("onclick", 'nextSearch(this)')

                topSearch.appendChild(otherResults);
            }

            outputEl.appendChild(topSearch);
            outputEl.appendChild(searchOutput);
            outputEl.appendChild(botSearch);

        })
    


    }

var nextSearch = function(elem) {
    otherResults = elem;
    var numberSelen = otherResults.innerText - 1;

    resultsPageNumber = numberSelen;
    
    bookSearch();
    return resultsPageNumber;
}

buttonEl.addEventListener("click", bookSearch);
