console.log('Movies App (vanilla JS)');
const movieTable = document.getElementById('movie-list-body'); // For the purpose of event delegation
const movieInput = document.getElementById('movie-title'); // Text input for movie title
const movieRating = document.getElementById('movie-rating'); // Number input for movie rating
const submit = document.getElementById('submit-button'); // Submit button
const nameSort = document.getElementById('name-sort'); // Button "Sort by name"
const ratingLowToHigh = document.getElementById('low-to-high'); // Button "Sort by rating (lowest to highest)"
const ratingHighToLow = document.getElementById('high-to-low'); // Button "Sort by rating (lowest to highest)"
const originalOrder = document.getElementById('original-order'); // Button "Back to original order"

let movieRatingArray = []; // Will hold the movies and ratings inside object literals.
const originalArray = []; // Will retain the original order in which the movies were submitted.

/* Adds the movie and rating to an object literal
then pushes it to the movieRatingArray */
function addMovie(movie, rating) {
    const keyValuePair = { movie, rating };
    originalArray.push(keyValuePair);
    movieRatingArray.push(keyValuePair);
};

// Event delegation for delete buttons
movieTable.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.parentElement.remove(); // Removes movie from the DOM
        for (let i = 0; i < movieRatingArray.length; i++){ // Removes movie from the movie rating array
            if (movieRatingArray[i].movie ===
                event.target.parentElement.previousSibling.previousSibling.innerText) {
                const index = movieRatingArray.indexOf(movieRatingArray[i]);
                if (index > -1) {
                    movieRatingArray.splice(index, 1);
                }
            }
        }
        // Removes movie from the original array.
        for (let i = 0; i < originalArray.length; i++){
            if (originalArray[i].movie ===
                event.target.parentElement.previousSibling.previousSibling.innerText) {
                const index = originalArray.indexOf(originalArray[i]);
                if (index > -1) {
                    originalArray.splice(index, 1);
                }
            }
        }
    };
});
// Event listenter for submit button
submit.addEventListener('click', function (event) {
    event.preventDefault();
    const movie = movieInput.value;
    const rating = parseFloat(movieRating.value); // Rating is a number value, not string
    if (movie.length < 2) { // checks to make sure input value is at least 2 characters long
        return;
    };
    if (isNaN(rating)) {// checks to make sure input value isn't blank
        return;
    };
    if (rating < 0 || rating > 10) {
        return;
    }
    addMovie(movie, rating); // Callback function
    const newTR = document.createElement('tr'); // creates new table row element
    for (let i = 0; i < movieRatingArray.length; i++){
        newTR.innerHTML = `<td>${movieRatingArray[i].movie}</td><td>${movieRatingArray[i].rating}</td><td><button>Delete</button></td>`
        movieTable.append(newTR);
    };
    movieInput.value = ''; // resets input field
    movieRating.value = ''; // resets input field
});
// Sorts the movies by alphabetical order
nameSort.addEventListener('click', function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    const deleteMovies = Array.from(movieTable.children);
    for (let i = 0; i < deleteMovies.length; i++){
        deleteMovies[i].remove();
    };
    // Calculates the new order
    const newSortedArray = movieRatingArray.sort(function (a, b) {
        if (a.movie < b.movie) {
            return -1;
        }
        if (a.movie > b.movie) {
            return 1;
        }
        return 0;
    });
    // Appends the rating list to the DOM.
    for (let i = 0; i < newSortedArray.length; i++){
        const newTR = document.createElement('tr');
        newTR.innerHTML = `<td>${newSortedArray[i].movie}</td><td>${newSortedArray[i].rating}</td><td><button>Delete</button></td>`
        movieTable.append(newTR);
    };
});
// Sorts the movies based on rating from lowest to highest.
ratingLowToHigh.addEventListener('click', function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    const deleteMovies = Array.from(movieTable.children);
    for (let i = 0; i < deleteMovies.length; i++){
        deleteMovies[i].remove();
    };
    // Calculates the new order
    const newSortedArray = movieRatingArray.sort(function (a, b) {
        if (a.rating < b.rating) {
            return -1;
        }
        if (a.rating > b.rating) {
            return 1;
        }
        return 0;
    });
    // Appends the new rating list to the DOM.
    for (let i = 0; i < newSortedArray.length; i++){
        const newTR = document.createElement('tr');
        newTR.innerHTML = `<td>${newSortedArray[i].movie}</td><td>${newSortedArray[i].rating}</td><td><button>Delete</button></td>`
        movieTable.append(newTR);
    };
});
// Sorts the movies based on rating from highest to lowest.
ratingHighToLow.addEventListener('click', function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    const deleteMovies = Array.from(movieTable.children);
    for (let i = 0; i < deleteMovies.length; i++){
        deleteMovies[i].remove();
    };
    // Calculates the new order
    const newSortedArray = movieRatingArray.sort(function (a, b) {
        if (a.rating > b.rating) {
            return -1;
        }
        if (a.rating < b.rating) {
            return 1;
        }
        return 0;
    });
    // Appends the rating list to the DOM.
    for (let i = 0; i < newSortedArray.length; i++){
        const newTR = document.createElement('tr');
        newTR.innerHTML = `<td>${newSortedArray[i].movie}</td><td>${newSortedArray[i].rating}</td><td><button>Delete</button></td>`
        movieTable.append(newTR);
    };
});
// Button restores the original order in which the movies were added.
originalOrder.addEventListener('click', function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    const deleteMovies = Array.from(movieTable.children);
    for (let i = 0; i < deleteMovies.length; i++) {
        deleteMovies[i].remove();
    };
    // Appends the rating list to the DOM.
    for (let i = 0; i < originalArray.length; i++){
        const newTR = document.createElement('tr');
        newTR.innerHTML = `<td>${originalArray[i].movie}</td><td>${originalArray[i].rating}</td><td><button>Delete</button></td>`
        movieTable.append(newTR);
    };
});