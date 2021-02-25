let plantArray = [];




let PlantObject = function (ID,pPlantName, pGerminated, pPlanted, pBloomed, pQuantity, pScoScale,pFoodDate,pNotes) {
    this.ID = ID;
    this.PlantName = pPlantName;
    this.Germinated = pGerminated;
    this.Planted = pPlanted;
    this.Bloomed = pBloomed;
    this.Quantity = pQuantity;
    this.ScovilleScale = pScoScale;
    this.FoodDate = pFoodDate;
    this.Notes= pNotes;
}

plantArray.push(new PlantObject(1,"Sunflower", "02/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Needs lots of water."));
plantArray.push(new PlantObject(2,"Peas", "02/27/2021", "02/24/2021", "6-8 Weeks", "3", "40000","02/28/2021", "Grows well in partial shade."));

document.addEventListener("DOMContentLoaded", function () {


    $(document).on("pagebeforeshow", "#ListAll", function (event) {  
        
        showPlantList();
    });
    $(document).on("pagebeforeshow", "#Edit", function (event) {   
        let localID = document.getElementById("IDparmHere").innerHTML;
        document.getElementById("PlantName").innerHTML = "Name of Plant: " + plantArray[localID - 1].PlantName;
        document.getElementById("Germinated").innerHTML = "Date Germiinated: " + plantArray[localID - 1].Germinated;
        document.getElementById("Bloomed").innerHTML = "Time to Bloom: " + plantArray[localID - 1].Bloomed;
        document.getElementById("FoodDate").innerHTML = "Date Last Given Food: " + plantArray[localID - 1].FoodDate;
        document.getElementById("Quantity").innerHTML = "Quantity: " + plantArray[localID - 1].Quantity;
        document.getElementById("Scoville").innerHTML = "Scoville Scale: " + plantArray[localID - 1].ScovilleScale;
        document.getElementById("Notes").innerHTML = "Notes: " + plantArray[localID - 1].Notes;
    });
 

});  



function SubmitPlant() {
    location.href="#ListAll";
}

function showPlantList() {
    


    let myUI = document.getElementById("divPlantList");


    //let ol = document.createElement('ol');
    //myUI.appendChild(ol);
    /* for(let i = 0; i < plantArray.length; i++)
    {
        let li = document.createElement('li');
        ol.appendChild(li);
        let tempStr = "<a href=#EditplantArray[i].PlantName + "<br>" + 
        "Date Germinated: " + plantArray[i].Germinated + "<br>" + 
        "Date Planted: " + plantArray[i].Planted + "<br>" + 
        "Time to Bloom" + plantArray[i].Bloomed + "<br>" +
        "Quantity: " + plantArray[i].Quantity + "<br>" +
        "Scoville Scale: " + plantArray[i].ScovilleScale;
        li.innerHTML =tempStr;
    };
*/

    while (divPlantList.firstChild) {   
        divPlantList.removeChild(divPlantList.firstChild);
    };

    var ul = document.createElement('ul');

    plantArray.forEach(function (element,) {   
        var li = document.createElement('li');
        li.classList.add('onePlant'); 
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.ID + ":  " + element.PlantName + "   " + element.Germinated;
        ul.appendChild(li);
    });
    myUI.appendChild(ul);

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var myArray = document.getElementsByClassName("onePlant");
    Array.from(myArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#Edit";
        });
    });
    }