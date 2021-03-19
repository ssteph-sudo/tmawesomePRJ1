//const { json } = require("body-parser");

let plantArray = [];

let sliderIndex = 0;


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

//plantArray.push(new PlantObject("Sunflower", "02/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Needs lots of water."));
//plantArray.push(new PlantObject("Peas", "03/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Grows well in partial shade."));

document.addEventListener("DOMContentLoaded", function () {


    $(document).on("pagebeforeshow", "#ListAll", function (event) {  
        
        //showPlantList();
        FillArrayFromServer();
        document.location.href = "index.html#ListAll"; //This seems to fix the error of the null ID.
    });
    $(document).on("pagebeforeshow", "#Edit", function (event) {
        
        if (document.getElementById("IDparmHere").innerHTML == "change1") {
            //alert('didnt work boi');
            document.location.href = "index.html#ListAll";
        }
        else {
            let localID = document.getElementById("IDparmHere").innerHTML;
            let arrayPointer = GetLocalID(localID);
            document.getElementById("PlantName").innerHTML = "Name of Plant: " + plantArray[arrayPointer].PlantName;
            document.getElementById("Germinated").innerHTML = "Date Germinated: " + plantArray[arrayPointer].Germinated;
            document.getElementById("Planted").innerHTML = "Date Planted: " + plantArray[arrayPointer].Planted;
            document.getElementById("Bloomed").innerHTML = "Time to Bloom: " + plantArray[arrayPointer].Bloomed;
            document.getElementById("FoodDate").innerHTML = "Date Last Given Food: " + plantArray[arrayPointer].FoodDate;
            document.getElementById("Quantity").innerHTML = "Quantity: " + plantArray[arrayPointer].Quantity;
            document.getElementById("Scoville").innerHTML = "Scoville Scale: " + plantArray[arrayPointer].ScovilleScale;
            document.getElementById("Notes").innerHTML = "Notes: " + plantArray[arrayPointer].Notes;
        }
    });

    document.getElementById("submitPlantButton").addEventListener("click", function () {

        let tempPlant = new PlantObject(document.getElementById("plantName").value, document.getElementById("dateGerminated").value, document.getElementById("datePlanted").value,
        document.getElementById("dateBloomed").value, document.getElementById("quantityInput").value, document.getElementById("slider1").value, document.getElementById("dateGivenFood").value,
        document.getElementById("notesInput").value);

        const request = new Request('/addPlant', {
            method: 'POST',
            body:JSON.stringify(tempPlant),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (theResponsePromise) {
                return theResponsePromise.json() })
                .then(function(theResponsePromiseJson) {
                    console.log(theResponsePromiseJson.toString()),
                    document.location.href = "#ListAll";
                })

                .catch(function (err) {
                    console.log(err);
                });
    });

    document.getElementById("deletePlantButton").addEventListener("click", function () {
        let localID = document.getElementById("IDparmHere").innerHTML;
        //console.log(localID);
        deletePlant(localID);
        FillArrayFromServer();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("modifyPlantButton").addEventListener("click", function() {
        let localID = document.getElementById("IDparmHere").innerHTML;
        changePlantInputFields(localID);
        document.location.href = "index.html#Modify";
    });

    document.getElementById("submitModifyButton").addEventListener("click", function() {

        let newPlant = new PlantObject(document.getElementById("modifyPlantName").value, document.getElementById("modifyDateGerminated").value,
        document.getElementById("modifyDatePlanted").value, document.getElementById("modifyDateBloomed").value, document.getElementById("modifyQuantityInput").value,
        document.getElementById("modifySlider1").value, document.getElementById("modifyDateGivenFood").value, document.getElementById("modifyNotesInput").value);

        modifyPlant(newPlant);
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("clearDataButton").addEventListener("click", function() {
        clearInputFields();
    });

    document.getElementById("sortAlphabetically").addEventListener("click", function() {
        sortByName();
    });

    document.getElementById("sortDate").addEventListener("click", function() {
        sortByGerminatedDate();
    });

    startImageSwapping();
});  

function showPlantList() {
    
    let myUI = document.getElementById("divPlantList");


    while (divPlantList.firstChild) {   
        divPlantList.removeChild(divPlantList.firstChild);
    };

    var ol = document.createElement('ol');

    plantArray.forEach(function (element,) {   
        var li = document.createElement('li');
        li.classList.add('onePlant'); 
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = /*element.ID */element.PlantName + "   " + element.Germinated
        ol.appendChild(li);
    });
    myUI.appendChild(ol);
    //console.log(ol);


    var myArray = document.getElementsByClassName("onePlant");
    Array.from(myArray).forEach(function (element) {
        element.addEventListener('click', function () {

        var parm = this.getAttribute("data-parm");  
 
        document.getElementById("IDparmHere").innerHTML = parm;
        document.location.href = "index.html#Edit";
        });
    });
    }

function deletePlant(plantID) {
    fetch('/deletePlant/' + plantID, {
        method:'DELETE'
    })
    .then(function(theResponsePromise) {
        //alert("Plant deleted successfully in cloud")
    })
    .catch(function (err) {
        //alert("Plant not deleted in cloud" + err);
    });
};

function GetLocalID(localID) {
    for (let i = 0; i < plantArray.length; i++) {
        if (localID == plantArray[i].ID) {
            return i;
        }
    }
}

function clearInputFields() {
    document.getElementById("plantName").value = "";
    document.getElementById("dateGerminated").value = "";
    document.getElementById("datePlanted").value = "";
    document.getElementById("dateBloomed").value = "";
    document.getElementById("quantityInput").value = 1;
    document.getElementById("slider1").value = 1;
    document.getElementById("dateGivenFood").value = "";
    document.getElementById("notesInput").value = "";
}

function changePlantInputFields(plantID) {
    console.log("modifying functuon running" + plantID);
    let arrayPointer = GetLocalID(plantID);
    let plantPointer = plantArray[arrayPointer];
    document.getElementById("modifyHeader").innerHTML = "Modifying Current Plant: " + plantPointer.PlantName;
    document.getElementById("modifyPlantName").value = plantPointer.PlantName;
    document.getElementById("modifyDateGerminated").value = plantPointer.Germinated;
    document.getElementById("modifyDatePlanted").value = plantPointer.Planted;
    document.getElementById("modifyDateBloomed").value = plantPointer.Bloomed;
    document.getElementById("modifyDateGivenFood").value = plantPointer.FoodDate;
    document.getElementById("modifyQuantityInput").value = plantPointer.Quantity;
    document.getElementById("modifySlider1").value = plantPointer.ScovilleScale;
    document.getElementById("modifyNotesInput").value = plantPointer.Notes;

    
}

function sortByName() {
    plantArray.sort((a, b) => (a.PlantName > b.PlantName) ? 1 : -1)
    showPlantList();
}

function sortByGerminatedDate() {
    plantArray.sort((a, b) => (a.Germinated > b.Germinated) ? 1 : -1)
    showPlantList();
}

function FillArrayFromServer() {
    fetch('/plantList')
    .then(function(theResponsePromise) {
        return theResponsePromise.json();
    })
    .then(function (serverData) {
        console.log(serverData);
        plantArray.length = 0;
        plantArray = serverData;
        showPlantList(); //createList
    })
    .catch(function (err) {
        console.log(err);
    });
};

function modifyPlant(newPlant) {
    newPlant.ID = document.getElementById("IDparmHere").innerHTML;

    const request = new Request('/modifyPlant/' + newPlant.ID, {
        method: 'PUT',
        body: JSON.stringify(newPlant),
        headers: new Headers ({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (theResponsePromise) {
            return theResponsePromise.json() })
        .then(function (theResponsePromiseJson) {
            console.log(theResponsePromiseJson.toString()),
            document.location.href = "#ListAll"
        })

        .catch(function (err) {
            console.log(err);
        });
};

function startImageSwapping() {
    let sliderClass = document.getElementsByClassName("mySlidesClass");
    for(let i = 0; i < sliderClass.length; i++) {
        sliderClass[i].style.display = "none";
    }

    if (sliderIndex >= sliderClass.length) {
        sliderIndex = 0;
    }
    sliderClass[sliderIndex].style.display = "block";
    sliderIndex++;

    setTimeout(startImageSwapping, 2000); //changes image every 2 seconds
}