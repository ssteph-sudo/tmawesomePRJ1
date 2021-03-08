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

//plantArray.push(new PlantObject("Sunflower", "02/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Needs lots of water."));
//plantArray.push(new PlantObject("Peas", "03/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Grows well in partial shade."));

document.addEventListener("DOMContentLoaded", function () {


    $(document).on("pagebeforeshow", "#ListAll", function (event) {  
        
        showPlantList();
    });
    $(document).on("pagebeforeshow", "#Edit", function (event) {   
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetLocalID(localID);
        document.getElementById("PlantName").innerHTML = "Name of Plant: " + plantArray[arrayPointer].PlantName;
        document.getElementById("Germinated").innerHTML = "Date Germinated: " + plantArray[arrayPointer].Germinated;
        document.getElementById("Bloomed").innerHTML = "Time to Bloom: " + plantArray[arrayPointer].Bloomed;
        document.getElementById("FoodDate").innerHTML = "Date Last Given Food: " + plantArray[arrayPointer].FoodDate;
        document.getElementById("Quantity").innerHTML = "Quantity: " + plantArray[arrayPointer].Quantity;
        document.getElementById("Scoville").innerHTML = "Scoville Scale: " + plantArray[arrayPointer].ScovilleScale;
        document.getElementById("Notes").innerHTML = "Notes: " + plantArray[arrayPointer].Notes;
    });

    document.getElementById("submitPlantButton").addEventListener("click", function () {

        plantArray.push(new PlantObject(document.getElementById("plantName").value, document.getElementById("dateGerminated").value, document.getElementById("datePlanted").value,
        document.getElementById("dateBloomed").value, document.getElementById("quantityInput").value, document.getElementById("slider1").value, document.getElementById("dateGivenFood").value,
        document.getElementById("notesInput").value));

        document.location.href = "index.html#ListAll";
        clearInputFields();

    });

    document.getElementById("deletePlantButton").addEventListener("click", function () {
        let localID = document.getElementById("IDparmHere").innerHTML;
        deletePlant(localID);
        showPlantList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("modifyPlantButton").addEventListener("click", function() {
        let localID = document.getElementById("IDparmHere").innerHTML;
        changePlantInputFields(localID);
        document.location.href = "index.html#Modify";
    });

    document.getElementById("submitModifyButton").addEventListener("click", function() {
        let localID = document.getElementById("IDparmHere").innerHTML;

        let arrayPointer = GetLocalID(localID);

        plantArray[arrayPointer] = new PlantObject(document.getElementById("modifyPlantName").value, document.getElementById("modifyDateGerminated").value,
        document.getElementById("modifyDatePlanted").value, document.getElementById("modifyDateBloomed").value, document.getElementById("modifyQuantityInput").value,
        document.getElementById("modifySlider1").value, document.getElementById("modifyDateGivenFood").value, document.getElementById("modifyNotesInput").value);

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
        li.innerHTML = element.ID + "   " + element.PlantName + "   " + element.Germinated
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
    let arrayPointer = GetLocalID(plantID);
    plantArray.splice(arrayPointer, 1);
}

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