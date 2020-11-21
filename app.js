// DECLARATIONS

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
        element.innerHTML = ''; //`${field}`;
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

// mark fields according to game
const markFields = function(startFields,endFields,cutOutFields,pointFields){

    // set start fields
    for(let i = 0; i < startFields.length;i++){
        console.log(`%c field-${startFields[i]}`,'color:blue;font-weight:bold;');
        let currentField = document.getElementById(`field-${startFields[i]}`);
        currentField.classList.add("start-field");
    }

    // set end field
    for(let i = 0; i < endFields.length ;i++){
        let currentField = document.getElementById(`field-${endFields[i]}`);
        currentField.classList.add("end-field");
    }

    // set cut-out fields
    for(let i = 0; i < cutOutFields.length; i++){
        let currentField = document.getElementById(`field-${cutOutFields[i]}`);
        currentField.classList.add('cut-out-field');        
    }

    // set point fields
    for(let i = 0; i < pointFields.length; i++){
        let currentField = document.getElementById(`field-${pointFields[i]}`);
        currentField.classList.add('point-field');
    }

    // activate all event listeners on ready board
    addAllEventListeners();

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

    // same for left neighbour but -1
    if((fieldNumber-1)%10 == 0){
        leftNeighbour = null;

    }else{
        leftNeighbour = (fieldNumber -1);
    }

    // first row has no neighbours on top
    if(fieldNumber-10 <= 0){
        topNeighbour = null;
    }else{
        topNeighbour = fieldNumber - 10;
    }

    // last row has no neighbours bellow
    if(fieldNumber + 10 > numberOfFields){
        bottomNeighbour = null;
    }else{
        bottomNeighbour = fieldNumber + 10;
    }

    console.log(`id = ${id}, leftNeighbour=${leftNeighbour}, rightNeighbour=${rightNeighbour}, topNeighbour=${topNeighbour}, bottomNeighbour=${bottomNeighbour}`);

    let style = window.getComputedStyle(element);

    let xStart = style.getPropertyValue('grid-row-start');
    let xEnd = style.getPropertyValue('grid-row-end');
    let yStart = style.getPropertyValue('grid-column-start');
    let yEnd = style.getPropertyValue('grid-column-end');

    let coordinates = `${yStart} / ${xStart} / ${yEnd} / ${xEnd}`;
    console.log(`coordinates = ${coordinates}`);
    console.table([coordinates]);

}


const addAllEventListeners = function(){
    // event listener configurations
    let startElements = document.getElementsByClassName("start-field");

    Array.from(startElements).forEach(function(startElement) {
        startElement.addEventListener('click', startGame);
    });
}


const startGame = function(){
    // start game
    console.log("GAME HAS STARTED!!!");

}




// MAIN 


generatePlayboard();

let startFields = [7,10,70];
let endFields = [31];
let cutOutFields = [1,2,3,11,12,13,21,22,23,15,16,25,26,18,19,28,29,38,39,42,43,45,46,48,49,52,53,55,56,58,59,72,73,75,76,77,78,79,82,83,85,86,87,88,89];
let pointFields = [14,40,66,90,93];

markFields(startFields,endFields,cutOutFields,pointFields);
// TODO: possibly need to removeEventListener() -> use former startFields / "start-field" elements before loading new playboard
