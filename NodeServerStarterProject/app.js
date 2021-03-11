var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

// insert our data code here
// start by creating data so we don't have to type it in each time
let serverMovieArray = [];

// define a constructor to create movie objects
let MovieObject = function (pTitle, pYear) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Title = pTitle;
    this.Year = pYear;
}

// start with sampple data
serverMovieArray.push(new MovieObject("Moonstruck", 1981));
serverMovieArray.push(new MovieObject("Wild At Heart", 1982 ));
serverMovieArray.push(new MovieObject("Raising Arizona", 1983));

// just one "site" with 2 routes

// index page , serve the HTML
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* GET movieList. */
app.get('/movieList', function(req, res) {
    res.json(serverMovieArray);
});



// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject ={
        status: "this is real bad",
        stack: "somebody called #$% somebody who called somebody <awful>"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: errorObject
    });
});



app.listen(3000);  // setting port number 
console.log('3000 is the magic port');

module.exports = app;
