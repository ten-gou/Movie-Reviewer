var searchEl = document.getElementById("search-input");
var movieButton = document.getElementById("m-button");
var tvButton = document.getElementById("t-button")
var outputEl = document.getElementById("output");
var saveID;
var saveName;
var movieSearch = function(){
    var movie = searchEl.value;
     //Replaces space with % for query
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
       
        
   
        //Results retireves up to 6 items that match up.
        for (let i = 0; i < 6; i++) {

            
            var movieID = data.results[i].id;
            var movieName = data.results[i].title;

            var mediaBox = document.createElement('div');
            mediaBox.setAttribute('id', 'movieID:'+movieID);
           
            mediaBox.className = 'mediaBox container px-6 py-20 bg-gray-100 m-2 shadow w-full min-w-xl';
            //Obtains date released, and title.
            var header = document.createElement('h2');
            header.className = 'header text-2xl font-bold text-center text-gray-800 mb-8'
            header.textContent = movieName+ ':'+'released on ' + data.results[i].release_date;

            //Obtains summary.
            var summary = document.createElement('p');
            summary.className = "summary text-2xl font-bold text-center text-gray-800 mb-8"
            summary.textContent = data.results[i].overview

            var cover = document.createElement('img');
            cover.className = 'mx-auto rounded-xl text-center';
            //Gets poster size
            var image = 'https://image.tmdb.org/t/p/w500/' +data.results[i].poster_path;
            cover.src =  image;
            cover.alt = data.results[i].title;
            //Adds a button to add movie to list
            var addButton = document.createElement('button');
            addButton.setAttribute('id', movieID);
            addButton.setAttribute('type','button');
            addButton.className = "addBtn text-lg lg:text-sm font-bold py-5 px-10 rounded bg-blue-800 text-blue-100 float-right"
            addButton.textContent = 'Add to List';
            //Allows user to save the id and name into local storage.        
            (function(index){
                addButton.addEventListener("click", function() {
                    saveID = data.results[index].id;
                    saveName = data.results[index].title;
                    console.log(saveID)
                    console.log(saveName)
                    localStorage.setItem(saveID,saveName);
                 
                })
              })(i)

            console.log(movieID);
            
            
            mediaBox.appendChild(cover);
            mediaBox.appendChild(header);
            mediaBox.appendChild(summary);
            mediaBox.appendChild(addButton);
            outputEl.appendChild(mediaBox);  
           
        
            
        }
       
        
       
        
        
        })

       
        
}
var tvSearch = function(){
    var movie = searchEl.value;
    //Replaces space with % for query
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
        
        //When searched for, it will produce, 6 items.
        //Creates its own box for each item.
        //Same as above, but for TV shows instead.
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

            var addButton = document.createElement('button');
            addButton.setAttribute('id','add');
            addButton.setAttribute('type','button');
            addButton.className = "text-lg lg:text-sm font-bold py-5 px-10 rounded bg-blue-800 text-blue-100 float-right"
            addButton.textContent = 'Add to List';
          
            (function(index){
                addButton.addEventListener("click", function() {
                    saveID = data.results[index].id;
                    saveName = data.results[index].name;
                    console.log(saveID)
                    console.log(saveName)
                    localStorage.setItem(saveID,'"'+saveName+'"');
                 
                })
              })(i)



            mediaBox.appendChild(cover);
            mediaBox.appendChild(header);
            mediaBox.appendChild(summary);
            mediaBox.appendChild(addButton);
            outputEl.appendChild(mediaBox); 
          
        
        }

        })
}



movieButton.addEventListener("click", movieSearch);
tvButton.addEventListener("click", tvSearch);
