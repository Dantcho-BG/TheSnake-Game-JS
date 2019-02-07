//Get the canvas
var canvas = document.getElementById("gameCanvas");
//Rendering context
var ctx = canvas.getContext("2d");

//Get canvas width and height
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

//Get grid widht and height (Grid is created from 10 by 10 boxes)
var gridSizeWidth = parseInt(canvasWidth / 10);
var gridSizeHeight = parseInt(canvasHeight / 10);

//Log grid size to console
console.log(gridSizeWidth + " - Grid Width");
console.log(gridSizeHeight + " - Grid Height");

//Create an empty grid array
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

//Get the middle of the grid
gridMiddleX = parseInt(gridSizeWidth / 2);
gridMiddleY = parseInt(gridSizeHeight / 2);

//Set the initial position of the snake
grid[gridMiddleY][gridMiddleX] = 1;

snakeSecondPartX = gridMiddleX - 1;
snakeThirdPartX = snakeSecondPartX - 1;

grid[gridMiddleY][snakeSecondPartX] = 1;
grid[gridMiddleY][snakeThirdPartX] = 1;

//Show the middle of the grind in the console
console.log(gridMiddleX + " - Grid X Middle");
console.log(gridMiddleY + " - Grid Y Middle");

//Draw the grid before the interval code runs the first time
draw ();

setInterval(function () {
    
    draw ();

}, 1000);

function moveSnakeForward () {

    

}

//Show the grid array in the console before drawing it (Used for debuging)
//console.log(grid);

//Draw the grid

function draw () {

    height = 0;
    width = 0;

    while (height < gridSizeHeight) {

        width = 0;

        while (width < gridSizeWidth) {

            if (grid[height][width] == 0) {

                posY = height * 10;
                posX = width * 10;

                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(posX, posY, 10, 10);

            }
            else if (grid[height][width] == 1) {

                posY = height * 10;
                posX = width * 10;

                ctx.fillStyle = "#FF0000";
                ctx.fillRect(posX, posY, 10, 10);

            }

            width++;

        }

        height++;

    }

}

