// start by creating data so we don't have to type it in each time
let movieArray = [];

document.addEventListener("DOMContentLoaded", function () {

    // page before show code *************************************************************************
     $(document).on("pagebeforeshow", "#ListAll", function (event) {   
        FillArrayFromServer()  // this gets data from server and then builds the li's
    });
    // end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************


function FillArrayFromServer(){
    // using fetch call to communicate with node server to get all data
    fetch('/movieList')
    .then(function (theResonsePromise) {  // wait for reply.  
        return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
    movieArray.length = 0;  // clear local array
    movieArray = serverData;   // use our server json data which matches our objects in the array perfectly
    createList();  // placing this here will make it wait for data from server to be complete before re-doing the list
    })
    .catch(function (err) {
     console.log(err);
    });
};


function createList() {
    // clear prior data
    var divMovieList = document.getElementById("divMovieList");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };
    // re-build the li's with fresh data
    var ul = document.createElement('ul');
    movieArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
        ul.appendChild(li);
    });
    divMovieList.appendChild(ul)
};




