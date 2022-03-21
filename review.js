var reviewEL = document.getElementById("review-section");
var iDentifier;
var movieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=039516e5ffedf8edd44caa8482c60cda&language=en-US&query='+iDentifier+'&page=1&include_adult=false';
var tvUrl = 'https://api.themoviedb.org/3/search/tv?api_key=039516e5ffedf8edd44caa8482c60cda&language=en-US&page=1&query='+iDentifier+'&include_adult=false'
var loadTVList = function(){


    for (var i = 0; i < localStorage.length; i++ ){
        const key = localStorage.key(i);
        iDentifier = localStorage.getItem(key);
        
        var tvUrl = 'https://api.themoviedb.org/3/search/tv?api_key=039516e5ffedf8edd44caa8482c60cda&language=en-US&page=1&query='+iDentifier+'&include_adult=false';

        fetch(tvUrl)
                .then(function(response) {
                return response.json();
            })
                .then(function(data) {
               
                
                console.log(data);
                //Creates box for movies added to
                        var reviewBox = document.createElement('div');
                        reviewBox.className = 'w-full md:w-full lg:w-1/2 max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between';
                
                        var imageContainer = document.createElement('div');
                        imageContainer.className ='md:flex-shrink-0'
                        //Gets Posters, uses i as 0, since it is pulling an exact name, results should always be 0.
                        var poster = document.createElement('img');
                        poster.className = 'md:w-56'
                        poster.src = 'https://image.tmdb.org/t/p/w500/'+data.results[0].poster_path;
                
                        var infoContainer = document.createElement('div');
                        infoContainer.className = 'flex flex-col flex-grow px-8 py-4 bg-gray-200';
                        //Gets Name.
                        var title = document.createElement('h3');
                        title.className = 'font-bold text-4xl md:text-2xl lg:text-2xl text-gray-800 movie--title';
                        title.innerText = data.results[0].original_name;
                        //Gets release date.
                        var releaseDate = document.createElement('span');
                        releaseDate.className = 'movie--year text-xl lg:text-sm lg:mb-4'
                        releaseDate.innerText = data.results[0].first_air_date;

                        var overviewContainer = document.createElement('div');
                        overviewContainer.className = 'flex-grow';
                
                        var innerInfo = document.createElement('p');
                        innerInfo.className = 'text-xl md:text-base lg:text-base text-gray-800 leading-snug truncate-overflow relative';
                        innerInfo.innerText = data.results[0].overview;

                        //Adds a delete button, will need to refresh afterwards, to see change.
                        var deleteButton = document.createElement('button');
                        deleteButton.setAttribute('id','delete');
                        deleteButton.setAttribute('type','button');
                        deleteButton.className = "flex flex-col text-md lg:text-sm font-bold py-2 px-4 rounded bg-blue-800 text-blue-100 float-right"
                        deleteButton.textContent = 'Delete';

                        overviewContainer.appendChild(innerInfo);
                        infoContainer.appendChild(title);
                        infoContainer.appendChild(releaseDate);
                        infoContainer.appendChild(overviewContainer);
                       
                        imageContainer.appendChild(poster);
                
                        reviewBox.appendChild(imageContainer);
                        reviewBox.appendChild(infoContainer);
                        reviewBox.appendChild(deleteButton);
                        reviewEL.appendChild(reviewBox);


                        (function(index){
                            saveButton.addEventListener("click", function() {
                                let value = review.getAttributeNode("id").value;
                                var reviewID = review.getAttribute('id');
                                sessionStorage.setItem(reviewID, value);
                                console.log(index);
                             
                            })
                          })(i)

                        (function(index){
                            deleteButton.addEventListener("click", function() {
                                
                                localStorage.key(index);
                                localStorage.removeItem(key);
                             
                            })
                          })(i)
                       
                    
            
                
           
            })
    }
    
  }

  var loadMovieList = function(){


    for (var i = 0; i < localStorage.length; i++ ){
        const key = localStorage.key(i);
        iDentifier = localStorage.getItem(key);
        
        var movieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=039516e5ffedf8edd44caa8482c60cda&language=en-US&query='+iDentifier+'&page=1&include_adult=false';

        fetch(movieUrl)
                .then(function(response) {
                return response.json();
            })
                .then(function(data) {
               
                
                console.log(data);
                //Creates box for movies added to
                        var reviewBox = document.createElement('div');
                        reviewBox.className = 'w-full md:w-full lg:w-1/2 max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between';
                
                        var imageContainer = document.createElement('div');
                        imageContainer.className ='md:flex-shrink-0'
                
                        var poster = document.createElement('img');
                        poster.className = 'md:w-56'
                        poster.src = 'https://image.tmdb.org/t/p/w500/'+data.results[0].poster_path;
                
                        var infoContainer = document.createElement('div');
                        infoContainer.className = 'flex flex-col flex-grow px-8 py-4 bg-gray-200 hidden md:block';
                
                        var title = document.createElement('h3');
                        title.className = 'font-bold text-4xl md:text-2xl lg:text-2xl text-gray-800 movie--title';
                        title.innerText = data.results[0].title;

                        var releaseDate = document.createElement('span');
                        releaseDate.className = 'movie--year text-xl lg:text-sm lg:mb-4'
                        releaseDate.innerText = data.results[0].release_date;

                        var overviewContainer = document.createElement('div');
                        overviewContainer.className = 'flex-grow';
                
                        var innerInfo = document.createElement('p');
                        innerInfo.className = 'text-xl md:text-base lg:text-base text-gray-800 leading-snug truncate-overflow relative';
                        innerInfo.innerText = data.results[0].overview;


                        var deleteButton = document.createElement('button');
                        deleteButton.setAttribute('id','delete');
                        deleteButton.setAttribute('type','button');
                        deleteButton.className = "flex flex-col text-md lg:text-sm font-bold py-2 px-4 rounded bg-blue-800 text-blue-100 float-right"
                        deleteButton.textContent = 'Delete';

                        var saveButton = document.createElement('button');
                        saveButton.setAttribute('id','save'+[i]);
                        saveButton.setAttribute('type','button');
                        saveButton.className = "saveBtn flex flex-col text-md lg:text-sm font-bold py-2 px-4 rounded bg-blue-400 text-blue-100 float-right"
                        saveButton.textContent = 'Save';

                        var review = document.createElement('textarea');
                        review.setAttribute('id','review-m'+[i]);
                        review.className = ' textarea flex flex-col text-md lg:text-sm font-bold py-2 px-4 rounded bg-gray-100 text-gray-800 w-full float-right'
                        review.placeholder = 'Write Review Here';


                        overviewContainer.appendChild(innerInfo);
                        infoContainer.appendChild(title);
                        infoContainer.appendChild(releaseDate);
                        infoContainer.appendChild(overviewContainer);
                       
                        imageContainer.appendChild(poster);
                
                        reviewBox.appendChild(imageContainer);
                        reviewBox.appendChild(infoContainer);
                        reviewBox.appendChild(deleteButton);
                        reviewBox.appendChild(review);
                        reviewBox.appendChild(saveButton);
                        reviewEL.appendChild(reviewBox);

                        
                    
                        //Saves Review
                        (function(index){
                            saveButton.addEventListener("click", function() {
                                let value = review.getAttributeNode("id").value;
                                var reviewID = review.getAttribute('id');
                                sessionStorage.setItem(reviewID, value);
                                console.log(index);
                             
                            })
                          })(i)
                        //Deletes from List (requires refresh)
                        (function(index){
                            deleteButton.addEventListener("click", function() {
                                
                                localStorage.key(index);
                                localStorage.removeItem(key);
                                console.log(index);
                             
                            })
                          })(i)

           
            })
    }
    
  }
        
        



loadMovieList(); 
loadTVList();


