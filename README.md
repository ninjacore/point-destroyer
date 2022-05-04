# Point Destroyer Version 2

## Intro

We hope you had a fun time solving our puzzles. 
This game was created for a group project in our Web and Server-side programming class. 

It was a new and challenging experience for us, especially for our lead designer without much programming experience.

- Lead Game Designer: Adrian W. Menti ( [Menti696](https://github.com/Menti696) )
- Lead Programmer: Lucien A. Haeller ( [DeleteAccess](https://github.com/DeleteAccess) )

You can play the game on: https://menti696.github.io/point-destroyer/



## Game description

Point Destroyer is a puzzle game in which players must use their mouse to move through a maze with the goal of collecting all the points and then reaching the final field. Point Destroyer is inspired by the game "The Witness" and is designed in the style of old retro games.


## Implementation of the game

The first thing we determined was the playing field. For this we decided to use a grid field. The grid field was first written manually, then we specified the ```generatePlayboard``` function, which generates the playfield automatically. 


### Playfield

The grid field allows us to define individual fields that are important for the rules of the game. So each playfield has one or more start and end points, mandatory fields ("points") and hidden fields ("cut-out"), which cannot be walked on. For this we have implemented the ```markFields``` function. This function requires arrays for each special field type as parameters. Each array contains the number of the fields to be marked. Since there might be a puzzle with several endpoints, we have also defined the data type array for this. The classes used here are the same ones we use in the CSS for their style.


### Paths

For the drawn path we used event listeners. We use these to define the exact flow of the game. The first one is used to start the game. For this we click into a start field. The next event is used to drag the field. By means of ```ev.target``` and ```ev.relatedTarget``` we could define the fields, which are moved over or left by the mouse (```fieldMovedInUpon``` and ```fieldMovedOutFrom```). If ```fieldMovedInUpon``` is a field that is already in the array ```currentPathFields```, we definitely go backwards. If ```fieldMovedInUpon``` is the second to last field in the array ```currentPathFields```, we have gone back exactly one field, which is allowed, and must clear ```currentPathFields``` by one field. If a value is not present in the array, the player moves forward. We have included the function ```fieldIsInPathAlready```, should the player want to cross his already drawn path. It checks if a value is already in the array. If this is the case an alert appears. 
Finally the last check is done to check if all points are in the array ( ```if(pointsDestroyed.lenght === pointFields.lenght)``` ).


### Buttons

Since there are several fields we decided to load the levels one after the other using buttons. This way there is a clear demarcation between the levels, which are only loaded once the active level has been solved. We also included a reload button, which allows the player to clear the arrays and thus reload the playfield without having to reload the page. In the tutorial we use the class "```text-container```" for the HTML element with the ID "```playfield```". Once the game starts, we replace the CSS class "```text-container```" with the CSS class "```grid-container```", which we used for programming the "playboard" (this way we didn't have to change anything in the previous game and level logic). At the end we reverse this again and display the final text. 


### Mini Tutorial

Due to user feedback we have integrated a mini tutorial. This tutorial contains the rules described at the beginning in short form. So a player doesn't have to reload the whole page and has the rules always present. The only exception is the last level. 


### Final Level

The final level is different from the previous levels. Basically it works exactly the same as the previous levels, with the difference of color selection, different alert messages and omitting the mini tutorial box. This level tests what the players have learned and is meant to give the impression of a boss fight. 

