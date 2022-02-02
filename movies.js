// // id to keep track of which element to remove (this would be better not in global scope)
let currentId = 0;

// // list of all of movies in memory for sorting / repainting
let movieList = [];

$(function () {
  $('#new-movie-form').on('submit', function(e) {
    e.preventDefault();
    let title = $('#title').val();
    let rating = $('#rating').val();

    let movieData = {title, rating, currentId};
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++
    movieList.push(movieData);

    $('#movie-table-body').append(HTMLtoAppend);
    $('#new-movie-form').trigger('reset');
  });
   // when you click the delete button, remove the closest parent tr
   $('tbody').on('click', '.btn.btn-danger', function(e) {
      
    // find the index where this movie is
    let indexToRemoveAt = movieList.findIndex(movie => movie.currentId === +$(e.target).data('deletedId'))
       
    // remove it from the array of movies
     movieList.splice(indexToRemoveAt, 1)

     // remove it from the DOM
     $(e.target).closest('tr').remove();
   })
})
  




//   // when an arrow is clicked, 
//   $(".fas").on("click", function(evt) {
    
//     // figure out what direction we are sorting and the key to sort by
//     let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
//     let keyToSortBy = $(evt.target).attr("id");
//     let sortedMovies = sortBy(moviesList, keyToSortBy, direction);
    
//     // empty the table
//     $("#movie-table-body").empty();

//     // loop over our object of sortedMovies and append a new row
//     for (let movie of sortedMovies) {
//       const HTMLtoAppend = createMovieDataHTML(movie);
//       $("#movie-table-body").append(HTMLtoAppend);
//     }

//     // toggle the arrow
//     $(evt.target).toggleClass("fa-sort-down");
//     $(evt.target).toggleClass("fa-sort-up");
//   });
// });

// /* accepts an array of objects and a key and sorts by that key */

// function sortBy(array, keyToSortBy, direction) {
//   return array.sort(function(a, b) {
//     // since rating is a number, we have to convert these strings to numbers
//     if (keyToSortBy === "rating") {
//       a[keyToSortBy] = +a[keyToSortBy];
//       b[keyToSortBy] = +b[keyToSortBy];
//     }
//     if (a[keyToSortBy] > b[keyToSortBy]) {
//       return direction === "up" ? 1 : -1;
//     } else if (b[keyToSortBy] > a[keyToSortBy]) {
//       return direction === "up" ? -1 : 1;
//     }
//     return 0;
//   });
// }

// /* createMovieDataHTML accepts an object with title and rating keys and returns a string of HTML */

function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}
