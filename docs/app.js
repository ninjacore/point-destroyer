/****************************************
 *       DECLARATIONS - variables       *
 *                                      *
 ****************************************/ 

/* Game Values */
/*
let startFields = [7,10,70];
let endFields = [31];
let cutOutFields = [1,2,3,11,12,13,21,22,23,15,16,25,26,18,19,28,29,38,39,42,43,45,46,48,49,52,53,55,56,58,59,72,73,75,76,77,78,79,82,83,85,86,87,88,89];
let pointFields = [14,40,66,90,93];
*/

let allStartFieldValues = [
    [91],
    [91],
    [7,10,70],
    [64,100],
    [10,91],
    [44,46],
    [1,41],
    [64,87]
];

let allEndFieldValues = [
    [10],
    [10],
    [31],
    [4,40],
    [3,70],
    [1,10,91,100],
    [95,99],
    [34,37]
];

let allCutOutFieldValues = [
    [12,13,15,16,18,19,22,23,25,26,28,29,42,43,45,46,48,49,52,53,55,56,58,59,72,73,75,76,78,79,82,83,85,86,88,89],
    [1,2,3,11,12,13,21,22,23,15,16,25,26,18,19,28,29,38,39,42,43,45,46,48,49,52,53,55,56,58,59,72,73,75,76,77,78,79,82,83,85,86,87,88,89],
    [1,2,3,11,12,13,21,22,23,15,16,25,26,18,19,28,29,38,39,42,43,45,46,48,49,52,53,55,56,58,59,72,73,75,76,77,78,79,82,83,85,86,87,88,89],
    [8,9,10,12,13,15,16,18,19,20,22,23,25,26,28,29,30,42,43,45,46,48,49,52,53,55,56,58,59,71,72,73,75,76,78,79,81,82,83,85,86,88,89,91,92,93],
    [1,2,9,11,12,14,15,17,21,24,25,29,33,34,35,37,38,39,42,43,44,45,47,48,49,52,53,54,55,57,58,59,72,73,75,76,78,79,80,82,83,85,86,88,89,90,98,99,100],
    [12,14,15,16, 18,19,25,26,29,33,34,35,36,37,45,49,52,54,55,56,58,59,65,66,72,73,75,76,78,79,82,83,85,86,88,89],
    [10,12,14,16,18,20,32,33,35,37,39,52,54,56,58,60,71,73,75,77,86,89,91,92,94,98],
    [1,2,9,10,11,20,23,24,27,28,33,38,63,65,68,73,74,75,76,77,78,81,83,86,88,90,91,100]
];

let allPointFieldValues = [
    [9,35,62,87,92],
    [5,35,62,68,97],
    [14,40,66,90,93],
    [1,34,61,70,96],
    [19,22,26,65,93],
    [3,9,31,38,62,67,70,84,96],
    [3,6,9,21,27,40,43,46,48,61,65,69,82,85,88],
    [4,7,12,26,30,41,43,48,52,55,60,67,69,71,80,84]
];

 /* Current Session Values */
let gameNumber = 6;

var currentPathFields = [];
let pointsDestroyed = [];





// DECLARATIONS - functions

// automatically generate html for playboard
const generatePlayboard = function(){

    // for n fields set grid-lines 
    /**  objective
     *  { "grid-row-start" → "1", "grid-row-end" → "5", "grid-column-start" → "1", "grid-column-end" → "5" }
     *  */ 

    // this is the pointer to the html playboard
    let playboard = document.getElementById("playboard");

    // delete all child-elements of current playboard to load new game configs
    playboard.innerHTML = '';

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
        element.innerHTML = ``; //`${field}`;
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

    // if final level, change colors
    if(gameNumber == 7){
        // for testing:
        console.log("FINAL LEVEL!!");
        colorFieldsForFinalLevel();
    }

}

const colorFieldsForFinalLevel = function(){

    // change border color
    let playboardElement = document.getElementById("playboard");
    playboardElement.classList.add("final-border");
    
    // change default fields
    let allItems = document.getElementsByClassName("item");
    Array.from(allItems).forEach(function(element){

        element.classList.add("final-item");

    });   
    
    // change color of all marked fields
    console.table([allStartFieldValues[gameNumber]]);
    Array.from(allStartFieldValues[gameNumber]).forEach(function(idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add classlist final-field...
        element.classList.remove("final-item");
        element.classList.add("final-start-field");
    });

    Array.from(allEndFieldValues[gameNumber]).forEach(function(idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add classlist final-field...
        element.classList.remove("final-item");
        element.classList.add("final-end-field");
    });

    Array.from(allCutOutFieldValues[gameNumber]).forEach(function(idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add classlist final-field...
        element.classList.remove("final-item");
        element.classList.add("final-cut-out-field");
    });

    Array.from(allPointFieldValues[gameNumber]).forEach(function(idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add classlist final-field...
        element.classList.remove("final-item");
        element.classList.add("final-point-field");
    });


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
        startElement.addEventListener('click', startLevel);
    });
}


const startLevel = function(event){
    // start level
    console.log("Level started");

    event.target.classList.add('path-field');
    currentPathFields.push(event.target.id);

                

    let fields = document.getElementsByClassName("item");
    let validFields = []
    Array.from(fields).forEach(function(field){
        
        if(field.classList.contains("cut-out-field")){
            // for testing
            console.log("%c invalid field:","color: red; font-weight: bolld;");
            console.table([field.classList]);
        }else{
            // for testing
            console.log("%c valid field:","color: green; font-weight:bold;")
            console.table([field.classList]);

            validFields.push(field);
        }

    })

    // create "mouseover" event listener for each field that is not cut-out
    Array.from(validFields).forEach(function(field){
        field.addEventListener('mouseover', (ev) => {   
            let numberOfPathFields = currentPathFields.length;

            // TODO: check if field is neighbour to a 'path-field'
            //  and only then:
            
            
            let lastIndex = numberOfPathFields-1;

            let fieldMovedInUpon = ev.target;
            let fieldMovedOutFrom = ev.relatedTarget;

            if(fieldMovedInUpon.id == currentPathFields[lastIndex-1]){
                // player going backwards
                console.log("going backwards");

                if(currentPathFields[lastIndex] == fieldMovedOutFrom.id){
                    let idLastElement = currentPathFields.pop();   // removes currentPathFields[lastIndex]
                    let undrawnElement = document.getElementById(idLastElement);
                    undrawnElement.classList.remove('path-field');

                    // if point field is undrawn, remove for list
                    if(undrawnElement.classList.contains('point-field')){
                        // pop the latest point in the list since it must have been this one
                        pointsDestroyed.pop();
                    }


                    // for final level
                    if(gameNumber == 7){
                        undrawnElement.classList.remove('final-path-field');
                        
                        // if not a marked field
                        if(!undrawnElement.classList.contains('start-field') && !undrawnElement.classList.contains('end-field') && !undrawnElement.classList.contains('point-field')){
                            undrawnElement.classList.add('final-item');                            
                        }
                    }
                }else{
                    console.log(`last element = ${currentPathFields[lastIndex]}, fieldMovedOutFrom.id = ${fieldMovedOutFrom.id}`);
                }

            }else{
                // player going forward
                console.log("going forward");

                // IDs for path checks
                idTo = fieldMovedInUpon.id.split("field-");
                // for testing
                console.table([idTo]);
                idTo = idTo[1];
                idFrom = fieldMovedOutFrom.id.split("field-");
                // for testing
                console.table([idFrom]);
                idFrom = Number(idFrom[1]);

                // for testing
                console.log(`idTo [${idTo}] == idFrom +1 [${idFrom +1}]`);
                console.log(`idTo [${idTo}] == idFrom -1 [[${idFrom -1}]]`);
                console.log(`idTo [${idTo}] == idFrom +10 [[${idFrom +10}]`);
                console.log(`idTo [${idTo}] == idFrom -10 [[${idFrom +10}]`);


                // skipping fields is not allowed, rule can be applied anytime due to new rules (+1, -1, +10, -10) below
                if(fieldMovedOutFrom.id != currentPathFields[lastIndex]){
                    console.log("skipping fields is not allowed");
                }else if(fieldIsInPathAlready(fieldMovedInUpon.id)){
                    console.log("field is already in path, cannot cross path!");

                    // special text for last level
                    if(gameNumber == 7){
                        setAlertMessage("💀 YOU FOOL! YOU CANNOT <br>CROSS PATHS IN THIS GAME!","Sorry");

                    }else{
                        setAlertMessage("🧚 Listen! You cannot cross paths in this game!","OK");
                    }

                    // show the alert box
                    functionAlert();

                    if(gameNumber == 7){
                        // red text for final level
                        let alertText = document.getElementById("confirm");
                        alertText.classList.add("red-alert");
                    }

                }else if(idTo == idFrom +1 || idTo == idFrom -1 || idTo == idFrom +10 || idTo == idFrom -10){
                    // this condition above fixes the issue of skipping fields or drawing diagonally. 


                    // checks ok, field can be drawn
                    currentPathFields.push(fieldMovedInUpon.id);
                    fieldMovedInUpon.classList.add('path-field');

                    // for final level
                    if(gameNumber == 7){
                        fieldMovedInUpon.classList.remove('final-item');
                        fieldMovedInUpon.classList.add('final-path-field');
                    }

                    // check if point destroyed
                    if(isPointField(fieldMovedInUpon.id)){
                        // TODO: check if not destroyed already - just in case
                        pointsDestroyed.push(fieldMovedInUpon.id);
                    }

                    // check if end-field
                    else if(isEndField(fieldMovedInUpon.id)){
                        
                        // player has collected all points if both array have the same size
                        if(pointsDestroyed.length === allPointFieldValues[gameNumber].length){
                            
                            // special text for last level
                            if(gameNumber == 7){
                                setAlertMessage("💀 YOU'VE BESTED ME!<br>GO ON, CHAMPION!","THX");

                            }else{
                                setAlertMessage("You've cleared the level! <br>Well done!!","THX");
                            }

                            // show the alert box
                            functionAlert();

                            if(gameNumber == 7){
                                // golden text if final level cleared
                                let alertText = document.getElementById("confirm");
                                alertText.classList.add("golden-alert");
                            }


                            // TODO: add button to load next board
                            showButton("next-level-button");
                            //gameNumber++;
                            //loadNextGame();

                        }
                    }

                }
            }
            
        });

    });

}

const setAlertMessage = function(message,confirmationText){

    let element = document.getElementById("confirm");
    element.innerHTML = `<div class="message">${message}</div><br><button class="yes">${confirmationText}</button>`;

}


const showButton = function(buttonId){

    let nextLevelButton = document.getElementById(buttonId);
    nextLevelButton.style.visibility = 'visible';



}

const isEndField = function(fieldId){

    let isEndField = false;

    let element = document.getElementById(fieldId);
    if(element.classList.contains("end-field")){
        isEndField = true;
    }

    return isEndField;

}

const isPointField = function(fieldId){

    let fieldIsPoint = false;

    let element = document.getElementById(fieldId);
    if(element.classList.contains("point-field")){
        fieldIsPoint = true;
    }

    return fieldIsPoint;
}

const fieldIsInPathAlready = function(fieldId){

    let fieldIsInPath = false;

    Array.from(currentPathFields).forEach(function(pathFieldId){
        if(fieldId == pathFieldId){
            fieldIsInPath = true;
        }
    })

    return fieldIsInPath;
}

const resetPlayboard = function(){

    // reset variables
    currentPathFields = [];
    pointsDestroyed = [];

    // reset view        
    generatePlayboard();
    markFields(allStartFieldValues[gameNumber],allEndFieldValues[gameNumber],allCutOutFieldValues[gameNumber],allPointFieldValues[gameNumber]);

    // hide next level button
    let nextLevelButton = document.getElementById("next-level-button");
    nextLevelButton.style.visibility = 'hidden';
}

const loadNextGame = function(){
    // reset variables
    currentPathFields = [];
    pointsDestroyed = [];

    // set to next level
    gameNumber++;

    // the game is over if all levels have been cleared
    if(gameNumber > 7){
        console.log("showFinalMessage:");
        showFinalMessage();
    }else{
        // reset board
        generatePlayboard();

        // draw fields
        markFields(allStartFieldValues[gameNumber],allEndFieldValues[gameNumber],allCutOutFieldValues[gameNumber],allPointFieldValues[gameNumber]);    
  
    }

    // hide next level button
    hideButton("next-level-button");

    if(gameNumber > 6){
        // don't show tutorial box if final level
        let miniTutorialBox = document.getElementById("mini-tutorial");
        miniTutorialBox.innerHTML = '';

        // show mean message
        miniTutorialBox.innerHTML = "<div class='not-a-tutorial-box'>💀 YOU'RE ON <br>YOUR OWN NOW. <br>FIGHT FOR <br>YOUR LIFE!</div>";

    }

    



}

const startGame = function(){
    // element with id "playboard":
    let playboardElement = document.getElementById("playboard");

    // element with id "playboard": remove class "text-container"
    playboardElement.classList.remove("text-container");
    // element with id "playboard": remove class "grid-container"
    playboardElement.classList.add("grid-container");

    //  innerHtml = '' (removes content from tutorial)
    resetPlayboard();

    // delete "start-game" button
    let nextLevelButton = document.getElementById("start-game-button");
    let parent = nextLevelButton.parentElement;
    parent.removeChild(nextLevelButton);

    // show mini tutorial
    showMiniTutorial();
    
    // show "reload board" button
    showButton("reload-board-button");
}

const showMiniTutorial = function(){

    let element = document.getElementById("mini-tutorial");
    element.classList.add('mini-text-container');

    element.innerHTML = `<div class="tutorial-box">
                            <div class="mini-proto-start-field"></div>
                            <div class="mini-tutorial-text">START</div>
                        </div>
                        <div class="tutorial-box">
                            <div class="mini-proto-end-field"></div>
                            <div class="mini-tutorial-text">END</div>
                            </div>
                        <div class="tutorial-box">
                            <div class="mini-proto-point-field"></div>
                            <div class="mini-tutorial-text">POINTS</div>
                        </div>`;

}

const hideButton = function(buttonId){
    // for testing
    console.log(`hiding button, gameNumber is ${gameNumber}`);

    let nextLevelButton = document.getElementById(buttonId);
    nextLevelButton.style.visibility = 'hidden';
}

/* special function for better alert boxes 
source: https://www.tutorialspoint.com/How-to-create-and-apply-CSS-to-JavaScript-Alert-box */
function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes").unbind().click(function() {
    confirmBox.hide();
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();
}

const showFinalMessage = function(){

    let element = document.getElementById("playboard");

    // element with id "playboard": remove classes "grid-container" and "final-border"
    element.classList.remove("grid-container");
    element.classList.remove("final-border");
    
    // element with id "playboard": remove class "text-container"
    element.classList.add( "text-container");

    // delete all fields
    element.innerHTML = '';

    let leftBox = document.getElementById("left-side");
    leftBox.innerHTML = '';

    // add final message
    element.innerHTML = `<p>Thanks for playing our game. <br>Lead Game Designer &nbsp; Adrian W. Menti <br>Lead Programmer&nbsp; Lucien A. Haeller <br><br>Now, get out!</p>`;
}


// MAIN 
hideButton("next-level-button");
hideButton("reload-board-button");

// load first game



// TODO: add classlist to id playboard "grid-container"

// resetPlayboard();


