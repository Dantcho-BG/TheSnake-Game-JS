//Get the canvas
var canvas = document.getElementById("gameCanvas");
//Rendering context
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 10, 10);

//Get canvas width and height
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

//Get grid widht and height (Grid is created from 10 by 10 boxes)
var gridSizeWidth = parseInt(canvasWidth / 10);
var gridSizeHeight = parseInt(canvasHeight / 10);

//Log grid size to console
console.log(gridSizeWidth + " - Grid Width");
console.log(gridSizeHeight + " - Grid Height");

//Create grid array
var grid = new Array;

counterWidth = 0;
counterHeight = 0;
var height = 0;

while (counterHeight < gridSizeHeight) {

    counterWidth = 0;

    while (counterWidth < gridSizeWidth) {

        if (!Array.isArray(grid[height])) {

            width = 0;
            grid[height] = new Array();

        }

        grid[height][width] = 0;

        width ++;
        counterWidth ++;

    }

    height ++;
    counterHeight ++;

}

//Show the grid array in the console
//console.log(grid);

