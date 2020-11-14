

// automatically generate html for playboard
const generatePlayboard = function(){

    // for n fields set grid-lines 
    /**  objective
     *  { "grid-row-start" → "1", "grid-row-end" → "5", "grid-column-start" → "1", "grid-column-end" → "5" }
     *  */ 

    // this is the pointer to the html playboard
    let playboard = document.getElementById("playboard");

    // starting coordinates within grid-lines
    let xCoordinate = 1;
    let yCoordinate = 1;

    // TODO: make this number choosable
    let numberOfFields = 100;
    let allFields = [];

    // create and add all the fields onto the playboard
    for(let field = 1;field <= numberOfFields;field++){
        let element = document.createElement('div');
        element.classList.add("item");
        element.id = `field-${field}`;
        element.innerHTML = `${field}`;
        playboard.appendChild(element);
    }

    // define all the fields around each field
    for(let field = 1;field <= numberOfFields;field++){
        let targetID = `field-${field}`;
        let targetElement = document.getElementById(targetID);
        findOutNeighbours(targetElement,field,numberOfFields);    
    }

    // set properties
    /**
     *  style.setProperty('grid-row-start',xStartNew);
        style.setProperty('grid-row-end',yStartNew);
        style.setProperty('grid-column-start',xEndNew);
        style.setProperty('grid-column-end',yEndNew);
     */

}


// find out neighbours (of a field)
const findOutNeighbours = function(element,fieldNumber,numberOfFields){

    let id = element.id;

    // neighbour variables
    let rightNeighbour;
    let leftNeighbour;
    let topNeighbour;
    let bottomNeighbour;

    // every multiple of 10 has no right neighbour (e.g. 30)
    if(fieldNumber%10 == 0){
        rightNeighbour = null;
    }else{
        rightNeighbour = (fieldNumber +1);
    }

    if((fieldNumber-1)%10 == 0){
        leftNeighbour = null;

    }else{
        leftNeighbour = (fieldNumber -1);
    }

    console.log(`id = ${id}, leftNeighbour=${leftNeighbour}, rightNeighbour=${rightNeighbour}`);

    let style = window.getComputedStyle(element);

    let xStart = style.getPropertyValue('grid-row-start');
    let xEnd = style.getPropertyValue('grid-row-end');
    let yStart = style.getPropertyValue('grid-column-start');
    let yEnd = style.getPropertyValue('grid-column-end');

    let coordinates = `${yStart} / ${xStart} / ${yEnd} / ${xEnd}`;
    console.log(`coordinates = ${coordinates}`);
    console.table([coordinates]);

}

generatePlayboard();

