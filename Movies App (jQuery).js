console.log('Movies App (jQuery)');

const movieTable = $('#movie-list-body'); // For the purpose of event delegation
const movieInput = $('#movie-title'); // Text input for movie title
const movieRating = $('#movie-rating'); // Number input for movie rating
const submit = $('#submit-button'); // Submit button

let movieRatingArray = []; // Will hold the movies and ratings inside object literals.
const originalArray = []; // Will retain the original order in which the movies were submitted.

/* Adds the movie and rating to an object literal
then pushes it to the movieRatingArray */
function addMovie(movie, rating) {
    const keyValuePair = { movie, rating };
    originalArray.push(keyValuePair);
    movieRatingArray.push(keyValuePair);
};

$('tbody').on('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.parentElement.remove(); // Removes movie from the DOM
        for (let i = 0; i < movieRatingArray.length; i++) { // Removes movie from the movie rating array
            if (movieRatingArray[i].movie ===
                event.target.parentElement.previousSibling.previousSibling.innerText) {
                const index = movieRatingArray.indexOf(movieRatingArray[i]);
                if (index > -1) {
                    movieRatingArray.splice(index, 1);
                }
            }
        };
        // Removes movie from the original array.
        for (let i = 0; i < originalArray.length; i++) { // Removes movie from the movie rating array
            if (originalArray[i].movie ===
                event.target.parentElement.previousSibling.previousSibling.innerText) {
                const index = originalArray.indexOf(originalArray[i]);
                if (index > -1) {
                    originalArray.splice(index, 1);
                }
            }
        };
    };
});
// Submit button with jQuery
$('#submit-button').on('click', function (event) {
    event.preventDefault();
    // console.log('You have entere a movie.');
    const movie = movieInput.val();
    const rating = parseFloat($(movieRating).val()); // Rating is a number value, not string
    if (movie.length < 2) { // checks to make sure input value is at least 2 characters long
        return;
    };
    if (isNaN(rating)) { // Only allows numbers to pass through
        return;
    };
    if (rating < 0 || rating > 10) { // Allows numbers 1 - 10
        return;
    }
    addMovie(movie, rating); // Callback function
    $('tbody').append(`<tr><td>${movie}</td><td>${rating}</td><td><button>Delete</button></td><tr>`);
    movieInput.val(''); // resets input field
    movieRating.val('');// resets input field
});
// Sorts the movies by alphabetical order
$('#name-sort').click(function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    $('tbody').children().remove();
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
        $('tbody').append(`<tr><td>${newSortedArray[i].movie}</td><td>${newSortedArray[i].rating}</td><td><button>Delete</button></td><tr>`);
    };
});
// Sorts the movies based on rating from lowest to highest.
$('#low-to-high').click(function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    $('tbody').children().remove();
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
        $('tbody').append(`<tr><td>${newSortedArray[i].movie}</td><td>${newSortedArray[i].rating}</td><td><button>Delete</button></td><tr>`);
    };
});
// Sorts the movies based on rating from highest to lowest.
$('#high-to-low').click(function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    $('tbody').children().remove();
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
        $('tbody').append(`<tr><td>${newSortedArray[i].movie}</td><td>${newSortedArray[i].rating}</td><td><button>Delete</button></td><tr>`);
    };
});
// Button restores the original order in which the movies were added.
$('#original-order').click(function () {
    // Deletes the old list from the DOM by iterating over the <tr> tags
    $('tbody').children().remove();
    // Appends the rating list to the DOM.
    for (let i = 0; i < originalArray.length; i++){
        $('tbody').append(`<tr><td>${originalArray[i].movie}</td><td>${originalArray[i].rating}</td><td><button>Delete</button></td><tr>`);
    };
});