let plantArray = [];




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

plantArray.push(new PlantObject("Sunflower", "02/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Needs lots of water."));
plantArray.push(new PlantObject("Peas", "02/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Grows well in partial shade."));

document.addEventListener("DOMContentLoaded", function () {


    $(document).on("pagebeforeshow", "#ListAll", function (event) {  
        
        showPlantList();
    });
    $(document).on("pagebeforeshow", "#Edit", function (event) {   
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("PlantName").innerHTML = "Name of Plant: " + plantArray[arrayPointer].PlantName;
        document.getElementById("Germinated").innerHTML = "Date Germiinated: " + plantArray[arrayPointer].Germinated;
        document.getElementById("Bloomed").innerHTML = "Time to Bloom: " + plantArray[arrayPointer].Bloomed;
        document.getElementById("FoodDate").innerHTML = "Date Last Given Food: " + plantArray[arrayPointer].FoodDate;
        document.getElementById("Quantity").innerHTML = "Quantity: " + plantArray[arrayPointer].Quantity;
        document.getElementById("Scoville").innerHTML = "Scoville Scale: " + plantArray[arrayPointer].ScovilleScale;
        document.getElementById("Notes").innerHTML = "Notes: " + plantArray[arrayPointer].Notes;
    });

    document.getElementById("submitPlantButton").addEventListener("click", function () {
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("deletePlantButton").addEventListener("click", function () {
        let localID = document.getElementById("IDparmHere").innerHTML;
        deleteMovie(localID);
        showPlantList();
        document.location.href = "index.html#ListAll";
    });

});  



function SubmitPlant() {
    document.location.href="index.html#ListAll";
}

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
        li.innerHTML = element.PlantName + "   " + element.Germinated;
        ol.appendChild(li);
    });
    myUI.appendChild(ol);


    var myArray = document.getElementsByClassName("onePlant");
    Array.from(myArray).forEach(function (element) {
        element.addEventListener('click', function () {

        var parm = this.getAttribute("data-parm");  
 
        document.getElementById("IDparmHere").innerHTML = parm;
        document.location.href = "index.html#Edit";
        });
    });
    }

function deleteMovie(movieID) {
    let arrayPointer = GetArrayPointer(movieID);
    plantArray.splice(arrayPointer, 1);
}

function GetArrayPointer(localID) {
    for (let i = 0; i < plantArray.length; i++) {
        if (localID == plantArray[i].ID) {
            return i;
        }
    }
}