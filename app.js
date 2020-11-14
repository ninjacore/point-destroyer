// file for JavaScript
document.addEventListener("DOMContentLoaded", (event) => {
    console.log('DOM is ready.')
    let itemA = document.getElementsByClassName("itemA")[0];
    
    console.log(itemA.style);

    console.log("my grid area is = " + itemA.style.gridArea)

    
    
    /**  objective
     *  { "grid-row-start" → "1", "grid-row-end" → "5", "grid-column-start" → "1", "grid-column-end" → "5" }
     *  */ 

    let style = window.getComputedStyle(itemA);

    let xStart = style.getPropertyValue('grid-row-start');
    let xEnd = style.getPropertyValue('grid-row-end');
    let yStart = style.getPropertyValue('grid-column-start');
    let yEnd = style.getPropertyValue('grid-column-end');

    let formerCoordinates = `${yStart} / ${xStart} / ${yEnd} / ${xEnd}`
    console.log(`formerCoordinates is = ${formerCoordinates}`);
    
    /** objective
     *  newCoordinates =  `1 / 1 / 5 / 5`;
     */
    console.log("changing style...");
    
    xStartNew = 1;
    yStartNew = 1;
    xEndNew = 5;
    yEndNew = 5;

    style.setProperty('grid-row-start',xStartNew);
    style.setProperty('grid-row-end',yStartNew);
    style.setProperty('grid-column-start',xEndNew);
    style.setProperty('grid-column-end',yEndNew);

    // check for new coordinates
    xStart = style.getPropertyValue('grid-row-start');
    xEnd = style.getPropertyValue('grid-row-end');
    yStart = style.getPropertyValue('grid-column-start');
    yEnd = style.getPropertyValue('grid-column-end');
    let newCoordinates = `${yStart} / ${xStart} / ${yEnd} / ${xEnd}`

    if (formerCoordinates != newCoordinates){
        console.log(`%c passed! ${formerCoordinates} != ${newCoordinates}`,'color:green;');
    }else{
        console.log(`%c failed!!!!!!! ${formerCoordinates} == ${newCoordinates}`,'color:red;');
    }

        /* co-ord. Y-start / X-start / Y-end / X-end */    
    
        
        console.log(`%c itemA has grid area = ${yStart} / ${xStart} / ${yEnd} / ${xEnd} `,'color: green; font-style: bold;') 
    itemA.style.gridArea = "1 / 1 / 5 / 5";
    

});
