// automatically generate html for playboard
const generatePlayboard = function(){

    // for n fields set grid-lines 
    /**  objective
     *  { "grid-row-start" → "1", "grid-row-end" → "5", "grid-column-start" → "1", "grid-column-end" → "5" }
     *  */ 

    let playboard = document.getElementById("playboard");

    let xCoordinate = 1;
    let yCoordinate = 1;

    let numberOfFields = 100;
    let allFields = [];

    for(let field = 1;field <= numberOfFields;field++){

        // let html = `<div class="item">${field}</div>`;
        let element = document.createElement('div');
        element.classList.add("item");
        element.id = `field-${field}`;
        // element.innerHTML = `${field}`;
        //playboard.innerHTML = html;
        playboard.appendChild(element);


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
const findOutNeighbours = function(){

}

generatePlayboard();