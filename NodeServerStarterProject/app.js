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
let serverPlantArray = [];

let PlantObject = function (pPlantName, pGerminated, pPlanted, pBloomed, pQuantity, pScoScale,pFoodDate,pNotes) {
    this.ID = Math.random().toString(16).slice(5);
    this.PlantName = pPlantName;
    this.Germinated = pGerminated;
    this.Planted = pPlanted;
    this.Bloomed = pBloomed;
    this.Quantity = pQuantity;
    this.ScovilleScale = pScoScale;
    this.FoodDate = pFoodDate;
    this.Notes= pNotes;
}

//serverPlantArray.push(new PlantObject("Sunflower", "02/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Needs lots of water."));
//serverPlantArray.push(new PlantObject("Peas", "03/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Grows well in partial shade."));


// just one "site" with 2 routes

// index page , serve the HTML
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* GET ListAll. */
app.get('/plantList', function(req, res) {
    res.json(serverPlantArray);
});

app.post('/addPlant', function(req, res) {
    console.log(req.body);
    serverPlantArray.push(req.body);
    res.status(200).send(JSON.stringify('success'));
});

app.put('/modifyPlant/:id', (req, res) => {
    let id = req.params.id;
    let plantObject = req.body;
    console.log(id);
    console.log(plantObject);
    for (let i = 0; i < serverPlantArray.length; i++) {
        if (serverPlantArray[i].ID == id) {
            serverPlantArray[i] = plantObject;
            res.send('success');
        }
    }
    res.status(404);
});

app.delete('/deletePlant/:id', (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < serverPlantArray.length; i++) {
        if (serverPlantArray[i].ID == id) {
            serverPlantArray.splice(i, 1);
            res.send('success');
        }
    }
    console.log(serverPlantArray);
    res.status(404);
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
