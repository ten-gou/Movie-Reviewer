var searchEl = document.getElementById("search-input");
var buttonEle = document.getElementById("m-button");
var outputEl = document.getElementById("output");

var movieSearch = function(){
    var movie = searchEl.value;
    var input = movie.replaceAll(" ", '%');
    
    var requestUrl = 'https://api.themoviedb.org/3/search/movie?api_key=039516e5ffedf8edd44caa8482c60cda&language=en-US&query='+input+'&page=1&include_adult=false';
   
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
        
        
        for (i = 0; i < 6; i++) {
            var mediaBox = document.createElement('div');
            mediaBox.className = 'container px-6 py-20 bg-gray-100 m-2 shadow w-full min-w-xl';
        
            var header = document.createElement('h2');
            header.className = 'text-2xl font-bold text-center text-gray-800 mb-8'
            header.textContent = data.results[i].title + ':'+'released on ' + data.results[i].release_date;


            var summary = document.createElement('p');
            summary.className = "text-2xl font-bold text-center text-gray-800 mb-8"
            summary.textContent = data.results[i].overview

            var cover = document.createElement('img');
            cover.className = 'mx-auto rounded-xl text-center';
            var image = 'https://image.tmdb.org/t/p/w500/' +data.results[i].poster_path;
            cover.src =  image;
            cover.alt = data.results[i].title;
            mediaBox.appendChild(cover);
            mediaBox.appendChild(header);
            mediaBox.appendChild(summary);
            outputEl.appendChild(mediaBox); 
          
           
        }

        })
}
var tvSearch = function(){
    var movie = searchEl.value;
    var input = movie.replaceAll(" ", '%');
    
    var requestUrl = 'https://api.themoviedb.org/3/search/tv?api_key=039516e5ffedf8edd44caa8482c60cda&language=en-US&page=1&query='+input+'&include_adult=false';
   
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
        
        
        for (i = 0; i < 6; i++) {
            var mediaBox = document.createElement('div');
            mediaBox.className = 'container px-6 py-20 bg-gray-100 m-2 shadow w-full min-w-xl';
        
            var header = document.createElement('h2');
            header.className = 'text-2xl font-bold text-center text-gray-800 mb-8'
            header.textContent = data.results[i].name + ':'+' first aired on ' + data.results[i].first_air_date;


            var summary = document.createElement('p');
            summary.className = "text-2xl font-bold text-center text-gray-800 mb-8"
            summary.textContent = data.results[i].overview

            var cover = document.createElement('img');
            cover.className = 'mx-auto rounded-xl text-center';
            var image = 'https://image.tmdb.org/t/p/w500/' +data.results[i].poster_path;
            cover.src =  image;
            cover.alt = data.results[i].name;
            mediaBox.appendChild(cover);
            mediaBox.appendChild(header);
            mediaBox.appendChild(summary);
            outputEl.appendChild(mediaBox); 
          
        
        }

        })
}




buttonEle.addEventListener("click", movieSearch);
buttonEle.addEventListener("click", tvSearch);
