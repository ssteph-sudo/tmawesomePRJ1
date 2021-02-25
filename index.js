let plantArray = [];


let PlantObject = function (pPlantName, pGerminated, pPlanted, pBloomed, pQuantity, pScoScale) {
    this.PlantName = pPlantName;
    this.Germinated = pGerminated;
    this.Planted = pPlanted;
    this.Bloomed = pBloomed;
    this.Quantity = pQuantity;
    this.ScovilleScale = pScoScale;
}

plantArray.push(new PlantObject("Sunflower", "02/27/2021", "02/24/2021", "02/28/2021", "3", "40000"));
plantArray.push(new PlantObject("Peas", "02/27/2021", "02/24/2021", "02/28/2021", "3", "40000"));


showPlantList();

function SubmitPlant() {
    location.href="#ListAll";
}

function showPlantList() {
    let myUI = document.getElementById("divPlantList");
    myUI.innerHTML = "";

    let ol = document.createElement('ol');
    document.getElementById('divPlantList').appendChild(ol);
    for(let i = 0; i < plantArray.length; i++)
    {
        let li = document.createElement('li');
        ol.appendChild(li);
        let tempStr = plantArray[i].PlantName + "<br>" + 
        "Date Germinated: " + plantArray[i].Germinated + "<br>" + 
        "Date Planted: " + plantArray[i].Planted + "<br>" + 
        "Date Bloomed: " + plantArray[i].Bloomed + "<br>" +
        "Quantity: " + plantArray[i].Quantity + "<br>" +
        "Scoville Scale: " + plantArray[i].ScovilleScale;
        li.innerHTML =tempStr;
    };
}