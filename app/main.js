/****************************************
 *       DECLARATIONS - variables       *
 ****************************************/

/* playtime counter */
let starttimeGame, endtimeGame, playtime;

/*  everything for replay */
let ownedGame = false
let recordToOwn

/* level configs */
let allStartFieldValues = [
    [91],
    [91],
    [7, 10, 70],
    [64, 100],
    [10, 91],
    [44, 46],
    [1, 41],
    [64, 87]
];

let allEndFieldValues = [
    [10],
    [10],
    [31],
    [4, 40],
    [3, 70],
    [1, 10, 91, 100],
    [95, 99],
    [34, 37]
];

let allCutOutFieldValues = [
    [12, 13, 15, 16, 18, 19, 22, 23, 25, 26, 28, 29, 42, 43, 45, 46, 48, 49, 52, 53, 55, 56, 58, 59, 72, 73, 75, 76, 78, 79, 82, 83, 85, 86, 88, 89],
    [1, 2, 3, 11, 12, 13, 21, 22, 23, 15, 16, 25, 26, 18, 19, 28, 29, 38, 39, 42, 43, 45, 46, 48, 49, 52, 53, 55, 56, 58, 59, 72, 73, 75, 76, 77, 78, 79, 82, 83, 85, 86, 87, 88, 89],
    [1, 2, 3, 11, 12, 13, 21, 22, 23, 15, 16, 25, 26, 18, 19, 28, 29, 38, 39, 42, 43, 45, 46, 48, 49, 52, 53, 55, 56, 58, 59, 72, 73, 75, 76, 77, 78, 79, 82, 83, 85, 86, 87, 88, 89],
    [8, 9, 10, 12, 13, 15, 16, 18, 19, 20, 22, 23, 25, 26, 28, 29, 30, 42, 43, 45, 46, 48, 49, 52, 53, 55, 56, 58, 59, 71, 72, 73, 75, 76, 78, 79, 81, 82, 83, 85, 86, 88, 89, 91, 92, 93],
    [1, 2, 9, 11, 12, 14, 15, 17, 21, 24, 25, 29, 33, 34, 35, 37, 38, 39, 42, 43, 44, 45, 47, 48, 49, 52, 53, 54, 55, 57, 58, 59, 72, 73, 75, 76, 78, 79, 80, 82, 83, 85, 86, 88, 89, 90, 98, 99, 100],
    [12, 14, 15, 16, 18, 19, 25, 26, 29, 33, 34, 35, 36, 37, 45, 49, 52, 54, 55, 56, 58, 59, 65, 66, 72, 73, 75, 76, 78, 79, 82, 83, 85, 86, 88, 89],
    [10, 12, 14, 16, 18, 20, 32, 33, 35, 37, 39, 52, 54, 56, 58, 60, 71, 73, 75, 77, 86, 89, 91, 92, 94, 98],
    [1, 2, 9, 10, 11, 20, 23, 24, 27, 28, 33, 38, 63, 65, 68, 73, 74, 75, 76, 77, 78, 81, 83, 86, 88, 90, 91, 100]
];

let allPointFieldValues = [
    [9, 35, 62, 87, 92],
    [5, 35, 62, 68, 97],
    [14, 40, 66, 90, 93],
    [1, 34, 61, 70, 96],
    [19, 22, 26, 65, 93],
    [3, 9, 31, 38, 62, 67, 70, 84, 96],
    [3, 6, 9, 21, 27, 40, 43, 46, 48, 61, 65, 69, 82, 85, 88],
    [4, 7, 12, 26, 30, 41, 43, 48, 52, 55, 60, 67, 69, 71, 80, 84]
];

/* Current Session Values */
let gameNumber = 0; // set to 7 for testing...
let currentPathFields = [];
let pointsDestroyed = [];
let levelCleared = false;



/****************************************
 *       DECLARATIONS - functions      *
 ****************************************/

// automatically generate html for playboard
const generatePlayboard = function () {

    // this is the pointer to the html playboard
    let playboard = document.getElementById("playboard");

    // delete all child-elements of current playboard to load new game configs
    playboard.innerHTML = '';

    // declare value for 10x10 fields
    let numberOfFields = 100;

    // create and add all the fields onto the playboard
    for (let field = 1; field <= numberOfFields; field++) {
        let element = document.createElement('div');
        element.classList.add("item");
        element.id = `field-${field}`;
        element.innerHTML = ``;
        playboard.appendChild(element);
    }

    // "reload board" button must be visible for each game
    showButton("reload-board-button");

    // define all the fields around each field 
    /** was used for testing in the beginning
     *  but is not used anymore 
     **/
    /*for(let field = 1;field <= numberOfFields;field++){
        let targetID = `field-${field}`;
        let targetElement = document.getElementById(targetID);
        findOutNeighbours(targetElement,field,numberOfFields);    
    }*/
}

// mark fields according to game configs
const markFields = function (startFields, endFields, cutOutFields, pointFields) {

    // set start fields
    for (let i = 0; i < startFields.length; i++) {
        console.log(`%c field-${startFields[i]}`, 'color:blue;font-weight:bold;');
        let currentField = document.getElementById(`field-${startFields[i]}`);
        currentField.classList.add("start-field");
    }

    // set end fields
    for (let i = 0; i < endFields.length; i++) {
        let currentField = document.getElementById(`field-${endFields[i]}`);
        currentField.classList.add("end-field");
    }

    // set cut-out fields (in those the player cannot draw)
    for (let i = 0; i < cutOutFields.length; i++) {
        let currentField = document.getElementById(`field-${cutOutFields[i]}`);
        currentField.classList.add('cut-out-field');
    }

    // set point fields
    for (let i = 0; i < pointFields.length; i++) {
        let currentField = document.getElementById(`field-${pointFields[i]}`);
        currentField.classList.add('point-field');
    }

    // activate event listeners on start-fields on ready playboard
    addClickToStartEventListeners();

    // if final level, change colors
    if (gameNumber == 7) {
        colorFieldsForFinalLevel();
    }

}

const colorFieldsForFinalLevel = function () {

    // change border color
    let playboardElement = document.getElementById("playboard");
    playboardElement.classList.add("final-border");

    // change default fields
    let allItems = document.getElementsByClassName("item");
    Array.from(allItems).forEach(function (element) {

        element.classList.add("final-item");

    });

    // change color of all marked fields
    console.table([allStartFieldValues[gameNumber]]);
    Array.from(allStartFieldValues[gameNumber]).forEach(function (idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add final-field version to classlist
        element.classList.remove("final-item");
        element.classList.add("final-start-field");
    });

    Array.from(allEndFieldValues[gameNumber]).forEach(function (idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add final-field version to classlist
        element.classList.remove("final-item");
        element.classList.add("final-end-field");
    });

    Array.from(allCutOutFieldValues[gameNumber]).forEach(function (idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add final-field version to classlist
        element.classList.remove("final-item");
        element.classList.add("final-cut-out-field");
    });

    Array.from(allPointFieldValues[gameNumber]).forEach(function (idNumber) {
        // get element by id
        let element = document.getElementById(`field-${idNumber}`);
        // add final-field version to classlist
        element.classList.remove("final-item");
        element.classList.add("final-point-field");
    });


}

// find out neighbours (of a field) - deprecated
const findOutNeighbours = function (element, fieldNumber, numberOfFields) {

    /** was used in generatePlayboard()
     *  for testing in the beginning
     *  but is not used anymore 
     **/

    let id = element.id;

    // neighbour variables
    let rightNeighbour;
    let leftNeighbour;
    let topNeighbour;
    let bottomNeighbour;

    // every multiple of 10 has no right neighbour (e.g. 30)
    if (fieldNumber % 10 == 0) {
        rightNeighbour = null;
    } else {
        rightNeighbour = (fieldNumber + 1);
    }

    // same for left neighbour but -1
    if ((fieldNumber - 1) % 10 == 0) {
        leftNeighbour = null;

    } else {
        leftNeighbour = (fieldNumber - 1);
    }

    // first row has no neighbours on top
    if (fieldNumber - 10 <= 0) {
        topNeighbour = null;
    } else {
        topNeighbour = fieldNumber - 10;
    }

    // last row has no neighbours bellow
    if (fieldNumber + 10 > numberOfFields) {
        bottomNeighbour = null;
    } else {
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


const addClickToStartEventListeners = function () {
    // event listener configurations
    let startElements = document.getElementsByClassName("start-field");

    Array.from(startElements).forEach(function (startElement) {
        startElement.addEventListener('click', startLevel);
    });
}


const startLevel = function (event) {
    // start level
    console.log("Level started");

    // mark start-field as path (visually and logically)
    event.target.classList.add('path-field');
    currentPathFields.push(event.target.id);


    let fields = document.getElementsByClassName("item");
    let validFields = []
    Array.from(fields).forEach(function (field) {

        // only fields that are not cut-out can be colored as path
        if (!field.classList.contains("cut-out-field")) {
            validFields.push(field);

        }

    })

    // create "mouseover" event listener for each field that is not cut-out
    Array.from(validFields).forEach(function (field) {
        field.addEventListener('mouseover', (ev) => {
            let numberOfPathFields = currentPathFields.length;

            let lastIndex = numberOfPathFields - 1;

            let fieldMovedInUpon = ev.target;
            let fieldMovedOutFrom = ev.relatedTarget;

            if (fieldMovedInUpon.id == currentPathFields[lastIndex - 1]) {
                // player going backwards
                console.log("going backwards");
                if ((currentPathFields[lastIndex] == fieldMovedOutFrom.id) && levelCleared == false) {
                    /** checking for "levelCleared" fixes the issue that 
                     * you can still draw when the level has been completed
                     *  */
                    // remove the field moved out from from the path (logically and visually)
                    let idLastElement = currentPathFields.pop();
                    let undrawnElement = document.getElementById(idLastElement);
                    undrawnElement.classList.remove('path-field');

                    // if point field is undrawn, remove from list of collected points
                    if (undrawnElement.classList.contains('point-field')) {
                        // pop the latest point in the list since it must have been this one
                        pointsDestroyed.pop();
                    }

                    // for final level
                    if (gameNumber == 7) {
                        undrawnElement.classList.remove('final-path-field');

                        // if a normal field has been undrawn then it needs to keep the final level looks
                        if (!undrawnElement.classList.contains('start-field') && !undrawnElement.classList.contains('end-field') && !undrawnElement.classList.contains('point-field')) {
                            undrawnElement.classList.add('final-item');
                        }
                    }
                }

            } else {
                // player going forward
                console.log("going forward");

                // IDs for path checks
                idTo = fieldMovedInUpon.id.split("field-");
                idTo = idTo[1];
                idFrom = fieldMovedOutFrom.id.split("field-");
                idFrom = Number(idFrom[1]);

                // for testing (can be removed anytime)
                console.log(`idTo [${idTo}] == idFrom +1 [${idFrom +1}]`);
                console.log(`idTo [${idTo}] == idFrom -1 [[${idFrom -1}]]`);
                console.log(`idTo [${idTo}] == idFrom +10 [[${idFrom +10}]`);
                console.log(`idTo [${idTo}] == idFrom -10 [[${idFrom +10}]`);


                /** "skipping fields is not allowed" rule can be applied
                 * anytime due to new rules (+1, -1, +10, -10) below
                 *  */
                if (fieldMovedOutFrom.id != currentPathFields[lastIndex]) {
                    console.log("skipping fields is not allowed");
                } else if (fieldIsInPathAlready(fieldMovedInUpon.id)) {
                    console.log("field is already in path, cannot cross path!");

                    // special text for last level
                    if (gameNumber == 7) {
                        setAlertMessage("💀 YOU FOOL! YOU CANNOT <br>CROSS PATHS IN THIS GAME!", "Sorry");

                    } else {
                        setAlertMessage("🧚 Listen! You cannot cross paths in this game!", "OK");
                    }

                    // show the alert box
                    functionAlert();

                    if (gameNumber == 7) {
                        // red text for final level
                        let alertText = document.getElementById("confirm");
                        alertText.classList.add("red-alert");
                    }

                } else if (levelCleared == false && (idTo == idFrom + 1 || idTo == idFrom - 1 || idTo == idFrom + 10 || idTo == idFrom - 10)) {
                    // this condition above fixes the issue of skipping fields or drawing diagonally. 
                    // levelCleared fixes the issue that you can still draw when the level has been completed


                    // checks ok, field can be drawn
                    currentPathFields.push(fieldMovedInUpon.id);
                    fieldMovedInUpon.classList.add('path-field');

                    // for final level
                    if (gameNumber == 7) {
                        fieldMovedInUpon.classList.remove('final-item');
                        fieldMovedInUpon.classList.add('final-path-field');
                    }

                    // check if point destroyed
                    if (isPointField(fieldMovedInUpon.id)) {
                        // save to game status array
                        pointsDestroyed.push(fieldMovedInUpon.id);
                    }

                    // check if end-field
                    else if (isEndField(fieldMovedInUpon.id)) {

                        // player has collected all points if both array have the same size
                        if (pointsDestroyed.length === allPointFieldValues[gameNumber].length) {

                            // disable drawing if level cleared
                            levelCleared = true;

                            // hide "reload board" button
                            hideButton("reload-board-button");

                            // special text for last level
                            if (gameNumber == 7) {
                                setAlertMessage("💀 YOU'VE BESTED ME!<br>GO ON, CHAMPION!", "THX");

                            } else {
                                setAlertMessage("You've cleared the level! <br>Well done!!", "THX");
                            }

                            // show the alert box
                            functionAlert();

                            if (gameNumber == 7) {
                                // golden text if final level cleared
                                let alertText = document.getElementById("confirm");
                                alertText.classList.add("golden-alert");
                            }


                            // display button to load next board 
                            showButton("next-level-button");

                        }
                    }

                }
            }

        });

    });

}

// function to change the text in the alert message box
const setAlertMessage = function (message, confirmationText) {

    let element = document.getElementById("confirm");
    element.innerHTML = `<div class="message">${message}</div><br><button class="yes">${confirmationText}</button>`;

}


const showButton = function (buttonId) {

    let nextLevelButton = document.getElementById(buttonId);
    nextLevelButton.style.visibility = 'visible';

}

// check if a field is an end-field
const isEndField = function (fieldId) {

    let isEndField = false;

    let element = document.getElementById(fieldId);
    if (element.classList.contains("end-field")) {
        isEndField = true;
    }

    return isEndField;

}

// check if a field is a point-field
const isPointField = function (fieldId) {

    let fieldIsPoint = false;

    let element = document.getElementById(fieldId);
    if (element.classList.contains("point-field")) {
        fieldIsPoint = true;
    }

    return fieldIsPoint;
}

const fieldIsInPathAlready = function (fieldId) {

    let fieldIsInPath = false;

    Array.from(currentPathFields).forEach(function (pathFieldId) {
        if (fieldId == pathFieldId) {
            fieldIsInPath = true;
        }
    })

    return fieldIsInPath;
}

const resetPlayboard = function () {

    // reset variables
    currentPathFields = [];
    pointsDestroyed = [];

    // reset view        
    generatePlayboard();
    markFields(allStartFieldValues[gameNumber], allEndFieldValues[gameNumber], allCutOutFieldValues[gameNumber], allPointFieldValues[gameNumber]);

    // hide next level button
    let nextLevelButton = document.getElementById("next-level-button");
    nextLevelButton.style.visibility = 'hidden';
}

const loadNextGame = function () {
    // reset variables
    currentPathFields = [];
    pointsDestroyed = [];
    levelCleared = false;

    // set to next level
    gameNumber++;

    // the game is over if all levels have been cleared
    if (gameNumber > 7) {

        endtimeGame = performance.now()
        playtime = endtimeGame - starttimeGame

        handleArcadeParameters();


    } else {
        // reset board
        generatePlayboard();

        // draw fields according to game configs
        markFields(allStartFieldValues[gameNumber], allEndFieldValues[gameNumber], allCutOutFieldValues[gameNumber], allPointFieldValues[gameNumber]);

    }

    // hide next level button
    hideButton("next-level-button");

    // hide the textbox if still showing
    let textBox = document.getElementById("confirm");
    textBox.style.display = 'none';

    // update and show level counter
    let levelCounter = document.getElementById("level-counter");
    if (gameNumber + 1 != allStartFieldValues.length + 1) {
        levelCounter.innerHTML = `<h2>GAME ${gameNumber+1} OF ${allStartFieldValues.length}</h2>`;
    }


    if (gameNumber > 6 && gameNumber < 8) {
        // don't show tutorial box if final level and don't show it beyond that, too
        let miniTutorialBox = document.getElementById("mini-tutorial");
        miniTutorialBox.innerHTML = '';

        // show a mean message instead
        miniTutorialBox.innerHTML = "<div class='not-a-tutorial-box'>💀 YOU'RE ON <br>YOUR OWN NOW. <br>FIGHT FOR <br>YOUR LIFE!</div>";

    }

}

const startGame = function () {

    // make sure html is correct
    reloadContainer();

    // element with id "playboard":
    let playboardElement = document.getElementById("playboard");

    // element with id "playboard": remove class "text-container"
    playboardElement.classList.remove("text-container");

    // element with id "playboard": add class "grid-container"
    playboardElement.classList.add("grid-container");

    //  innerHtml = '' (removes content from tutorial)
    resetPlayboard();

    // set up box on the left
    let leftBox = document.getElementById("left-side");
    leftBox.innerHTML = `<button id="reload-board-button" type="button" class="button" onclick="resetPlayboard()">RELOAD BOARD</button>
    <div id="mini-tutorial"></div>
    <div id="level-counter"></div>`;

    // delete "start-game" button
    let nextLevelButton = document.getElementById("start-game-button");
    let parent = nextLevelButton.parentElement;
    parent.removeChild(nextLevelButton);

    // show mini tutorial on the side
    showMiniTutorial();

    // show "reload board" button
    showButton("reload-board-button");

    hideButton("show-leaderboard-button");

    // update and show level counter
    let levelCounter = document.getElementById("level-counter");
    levelCounter.innerHTML = `<h2>GAME ${gameNumber+1} OF ${allStartFieldValues.length}</h2>`;

    // start playtime counter
    starttimeGame = performance.now()

}

// used to show hints to the player while focusing on the level
const showMiniTutorial = function () {

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
                            <div class="mini-tutorial-text">POINTS YOU NEED</div>
                        </div>`;

}

// can be used to hide any button
const hideButton = function (buttonId) {

    let nextLevelButton = document.getElementById(buttonId);
    nextLevelButton.style.visibility = 'hidden';
}

/* special function for better alert boxes (uses jQuery)
source: https://www.tutorialspoint.com/How-to-create-and-apply-CSS-to-JavaScript-Alert-box */
function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes").unbind().click(function () {
        confirmBox.hide();
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();
}

// show this message if all levels have been cleared
const showFinalMessage = function () {

    let element = unloadPlayboard()

    // add final message
    element.innerHTML = `<p>
    You did it! Thank you for playing Point Destroyer.<br>
    We hope you had a fun time solving our puzzles. This game was created for a group project in our Web and Server-side programming class. It was a new and challenging experience for us, especially for our lead designer without much programming experience.
    </p>
    <p>We wish you a nice day!</p>
    
    <p>Lead Programmer: Lucien A. Haeller<br>
    Lead Game Designer: Adrian W. Menti<br>
    December 2020</p>`;
}


const handleArcadeParameters = async function () {

    // load available emojis
    let emojiData = await apiDB.getEmojis()
    
    // clean up view
    let element = unloadPlayboard()
    let list = ''

    for (i = 0; i < emojiData.length; i++) {
        list += `<option>${emojiData[i]}</option>`
    }

    if(ownedGame){
    
        let playtimeToBeat = recordToOwn.initialPlaytime
        let wasFaster = false
        if(playtimeToBeat > playtime){
            wasFaster = true
        }

        if(wasFaster){
            element.innerHTML = `            
            <div>
            <p>You Won!</p>
            <p>Your time: ${playtime} ms</p>
            <p>Initial playtime: ${playtimeToBeat} ms</p>
            <form id="ownedPlayerRecordForm" name="PlayerRecord", action="" method="get" enctype="text/html">
            <fieldset>
                <legend>Register yourself on the leaderboard of Point Destoyer</legend>
                <div>
                    <label for="ownedMessage" >What you will be remembered by: </label>
                    <textarea id="ownedMessage" name="ownedMessage" required="" placeholder="Write a new message" maxlength="10"></textarea> 
                </div>
                <div>
                    <label for="submit-button"></label>
                    <button id="submit-button" type="button" class="button"onclick="submitOwnedPlayerRecord()">Submit</button>
                </div>
            </fieldset>
            </form>
            </div>`
        }else{
            element.innerHTML = `<div>
            <p>You Lost!</p>
            <p>Your time: ${playtime} ms<</p>
            <p>Initial playtime: ${playtimeToBeat} ms</p>
            <p>Better luck next time!</p>
            <button id="start-game-button" type="button" class="button" onclick="startGame()">START GAME</button>
            <button id="show-leaderboard-button" type="button" class="button" onclick="loadLeaderboard()">LEADERBOARD</button>
            </div>`
        }
        
    }else{
        // ask player to enter information
        // let them write a message
        // let player select their emoji
        element.innerHTML = 
        `<form id="initialPlayerRecordForm" name="PlayerRecord", action="" method="get" enctype="text/html">
        <fieldset>
            <legend>Register yourself on the leaderboard of Point Destoyer</legend>
            <div>
                <label for="initialPlayerName" >What you will be remembered by: </label>
                <textarea id="initialPlayerName" name="initialPlayerName" required="" placeholder="Enter your name" maxlength="10"></textarea> 
            </div>
            <div>
                <label for="initialMessageInput">Your message to your fellow players: </label>
                <textarea id="initialMessageInput" name="initialMessageInput" required="" placeholder="Write a message" maxlength="15"></textarea> 
            </div>
            <div id="custom-select">
                <label for="initialEmojiInput">Select an emoji as your coat of arms: </label>
                <select id="initialEmojiInput" size="2">
                    ${list}
                </select>
            </div>
            <div>
                <label for="submit-button"></label>
                <button id="submit-button" type="button" class="button"onclick="submitPlayerRecord()">Submit</button>
            </div>
        </fieldset>
        </form>`
    }
   
}

const submitOwnedPlayerRecord = function () {

    // get new data
    let form = document.getElementById('ownedPlayerRecordForm')
    let ownedMessageInput = document.getElementById('ownedMessage').value.toString();
    let fasterTimeDelivered = playtime.toString();

    // store message to DB
    let player = {
        id: recordToOwn.id,
        playername: recordToOwn.playername,
        initialMessage: recordToOwn.initialMessage,
        ownedMessage: ownedMessageInput,
        initialPlaytime: recordToOwn.initialPlaytime,
        fasterTime: fasterTimeDelivered,
        emoji: recordToOwn.emoji
    }
    console.log("%c PLAYER RECORD TO OWN!!!!","color:yellow; font-weight:bold;")
    console.table(player)

    apiDB.connect("player","PUT",player)
    //apiDB.connect("player", "POST", player)

    // load leaderboard
    loadLeaderboard(player)


}

const submitPlayerRecord = function () {

    let initialForm = document.getElementById('initialPlayerRecordForm')
    console.log("initalForm element = ")
    console.table(initialForm)


    let nameOfInitialPlayer = document.getElementById('initialPlayerName').value.toString();
    let initialMessageFromPlayer = document.getElementById('initialMessageInput').value.toString();
    let chosenEmoji = document.getElementById('initialEmojiInput').value.toString();
    let deliverPlaytime = playtime.toString();
    let randomID = Math.random();
    randomID = randomID.toString().substring(2) + nameOfInitialPlayer;

    console.log("initialMessageInput: ", initialMessageFromPlayer)
    console.log("initialEmojiInput: ", chosenEmoji)

    // store message to DB
    let player = {
        id: randomID,
        playername: nameOfInitialPlayer,
        initialMessage: initialMessageFromPlayer,
        ownedMessage: "",
        initialPlaytime: deliverPlaytime,
        fasterTime: null,
        emoji: chosenEmoji
    }
    //apiDB.connect("player","PUT",player)
    apiDB.connect("player", "POST", player)

    // load leaderboard
    loadLeaderboard(player)

}
const loadLeaderboard = async function (currentPlayer = ''){

    let allPlayerRecords = await apiDB.connect("player", "GET")

    hideButton("show-leaderboard-button");

    // make sure current player is shown in view but eliminate duplicates if server was fast
    currentPlayer ? allPlayerRecords.push(currentPlayer) : playFinished = false
    let playerRecordsJSON = allPlayerRecords.map(JSON.stringify)
    let recordsAsSet = new Set(playerRecordsJSON)
    allPlayerRecords = Array.from(recordsAsSet).map(JSON.parse)
    
    console.table(allPlayerRecords)

    let leaderboard = []
    leaderboard = allPlayerRecords.sort((r1,r2)=>{
        return r1.initialPlaytime - r2.initialPlaytime
    })

    // playtime to show
    

    leaderboard.forEach(entry => {
        let playtimeToShow = entry.initialPlaytime
        entry.isOwned = false
        entry.textToShow = entry.ownedMessage

        if(entry.fasterTime != null && Number(entry.initialPlaytime) > Number(entry.fasterTime)){
            console.log("%c true faster time","color:green")
            
            //playtimeToShow = entry.fasterTime
            entry.isOwned = true
            entry.textToShow = entry.ownedMessage
            
        } 
        
        
        let minutes =  Math.floor(playtimeToShow / 60000)
        minutes = ("0" + minutes).slice(-2)
        let seconds = ((playtimeToShow % 60000) / 1000).toFixed(0)
        seconds = ("0" + seconds).slice(-2)
        let playtimeDisplayed = minutes + ":" + seconds
        entry.time = playtimeDisplayed.split(".",1).toString()
        
    });
    //console.table(leaderboard)

    let element = unloadPlayboard()

    let recordHTML = `  <h2>Leaderboard</h2>
    <div id="leaderboardtext1">Welcome to the leaderboard of Point Destroyer. Here you can see the time and messages of the other players. If you want, you can try to own a player with a better score than you.</div>
    <div id="leaderboardtext2">If you manage to beat their time, you can rewrite their message and change their coat of arms. Good luck and have fun owning people or play again for a better time.</div>
    <p></p> 
    <div class="flex-container">
        <div class="playerName">Title</div>
        <div class="Message">Commandment</div>
        <div class="emojiLeaderboard">Coat of Arms</div>  
        <div class="playtimeforGame">Time</div>
        <div class="ownAplayer">Own a Player</div>
    </div>`

    for (let i = 0; i < leaderboard.length; i++) {

        if(leaderboard[i].isOwned){

            recordHTML += `

            <div class="flex-container">
                <span class="playerTitle"><del>${leaderboard[i].playername}</del></span>
                <span class="commandment">${leaderboard[i].ownedMessage}</span>
                <span class="coatOfArms"><del>${leaderboard[i].emoji}</del></span>  
                <span class="recordedPlaytime"><del>${leaderboard[i].time}</del></span>
                <button class="button own-button owned-button" type="button"><del>Owned</del></button>
                
            </div>` 

        }else{    

            // special html for first record
            if(i == 0){

            recordHTML += `

            <div class="flex-container">
                <span class="playerTitle">${leaderboard[i].playername}</span>
                <span class="commandment">${leaderboard[i].initialMessage}</span>
                <span class="coatOfArms">${leaderboard[i].emoji}</span>  
                <span class="recordedPlaytime">${leaderboard[i].time}</span>
                <button class="button top-player" type="button">Is King</button>
            </div>`  

            }else{       

            recordHTML += `

            <div class="flex-container">
                <span class="playerTitle">${leaderboard[i].playername}</span>
                <span class="commandment">${leaderboard[i].initialMessage}</span>
                <span class="coatOfArms">${leaderboard[i].emoji}</span>  
                <span class="recordedPlaytime">${leaderboard[i].time}</span>
                <button class="button own-button" type="button" onclick='startOwnedPlay(${JSON.stringify(leaderboard[i])})'>Own</button>
            </div>`   
            }  
        }           
    }
    recordHTML += `</ol>`
    element.innerHTML = recordHTML

}

const startOwnedPlay = function(record) {

    // set up global for special play
    recordToOwn = record
    ownedGame = true
    gameNumber = 0

    startGame()

}

const unloadPlayboard = function () {
    let element = document.getElementById("playboard");

    // element with id "playboard": remove classes "grid-container" and "final-border"
    element.classList.remove("grid-container");
    element.classList.remove("final-border");

    // element with id "playboard": remove class "text-container"
    element.classList.add("text-container");

    // delete all fields
    element.innerHTML = '';

    let leftBox = document.getElementById("left-side");
    leftBox.innerHTML = '';

    return element
}

const reloadContainer = function () {
    let element = document.getElementById("container");

    // delete all fields
    element.innerHTML = `<div class="left-side" id="left-side">
            <button id="reload-board-button" type="button" class="button" onclick="resetPlayboard()">RELOAD BOARD</button>
            <div id="mini-tutorial"></div>
            <div id="level-counter"></div>
        </div>
        <div class="text-container" id="playboard">
            <div class="tutorial-box">
                <div class="proto-start-field"></div>
                <div class="tutorial-text">THIS IS THE <b>START</b> FIELD. CLICK ON IT.</div>
            </div>
            <div class="tutorial-box">
                <div class="proto-end-field"></div>
                <div class="tutorial-text">THIS IS THE <b>END</b> FIELD.</div>
            </div>
            <div class="tutorial-box">
                <div class="proto-point-field"></div>
                <div class="tutorial-text">THESE ARE THE <b>POINTS</b>. YOU NEED TO COLLECT THEM ALL.</div>
            </div>	
            <div>
                MAKE SURE TO USE CHROMIUM-BASED BROWSERS <br>LIKE GOOGLE CHROME, BRAVE OR MICROSOFT EDGE <br>FOR THE BEST PERFORMANCE.
            </div>

        </div>
        <div class="right-side" id="right-side">
            <!--<button id="test-game-button" type="button" class="button" onclick="handleArcadeParameters()">TESTING</button>-->
            <button id="start-game-button" type="button" class="button" onclick="startGame()">START GAME</button>
            <button id="next-level-button" type="button" class="button" onclick="loadNextGame()">NEXT LEVEL</button>
            <button id="show-leaderboard-button" type="button" class="button" onclick="loadLeaderboard()">LEADERBOARD</button>
            
        </div>`;

    return element
}


/************************************
 *       GAME INITIALIZATON         *
 ************************************/

// MAIN 
hideButton("next-level-button");
hideButton("reload-board-button");

// FOR TESTING
/*
let bilbo = 
{
    "id": "9349553567702911lefthanded",
    "playername": "lefthanded",
    "initialMessage": "slow start. fast finish.",
    "ownedMessage": "",
    "initialPlaytime": "284057.1000000015",
    "fasterTime": null,
    "emoji": "🩸"
}
loadLeaderboard(bilbo)*/
//loadLeaderboard()


