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

var snakeLength = 4;

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

        grid[height][width] = new Array();
        grid[height][width]["colour"] = 0;
        grid[height][width]["type"] = 0;

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
grid[gridMiddleY][gridMiddleX]["colour"] = 1;
grid[gridMiddleY][gridMiddleX]["type"] = "h";

snakeSecondPartX = gridMiddleX - 1;
snakeThirdPartX = snakeSecondPartX - 1;
snakeFourthPartX = snakeThirdPartX - 1;

grid[gridMiddleY][snakeSecondPartX]["colour"] = 1;
grid[gridMiddleY][snakeSecondPartX]["type"] = "t1";
grid[gridMiddleY][snakeThirdPartX]["colour"] = 1;
grid[gridMiddleY][snakeThirdPartX]["type"] = "t2";
grid[gridMiddleY][snakeFourthPartX]["colour"] = 1;
grid[gridMiddleY][snakeFourthPartX]["type"] = "t3";

//Show the middle of the grind in the console
console.log(gridMiddleX + " - Grid X Middle");
console.log(gridMiddleY + " - Grid Y Middle");

var direction = "up";

function determineDirection(event) {

    keyPressed = event.keyCode;

    if (keyPressed == 65 || keyPressed == 37) {

        direction = "left";

    }
    else if (keyPressed == 87 || keyPressed == 38) {

        direction = "up";

    }
    else if (keyPressed == 68 || keyPressed == 39) {

        direction = "right";

    }
    else if (keyPressed == 83 || keyPressed == 40) {

        direction = "down";

    }

}

function checkIfEatingSelf () {

    snakePartNumber = 1;
    snakeParts = snakeLength - 1;

    while (snakePartNumber < snakeLength) {

        snakePartName = "t" + snakePartNumber;

        if (headPositionX == snakeTailParts[snakePartName]["tailPartX"] && headPositionY == snakeTailParts[snakePartName]["tailPartY"]) {

            clearInterval(reRenderer);

        }

        snakePartNumber ++;

    }

}

var food = new Array();

function generateFood () {

    exit = false;

    while (exit == false) {

        food["x"] = Math.floor((Math.random() * 49) + 1);
        food["y"] = Math.floor((Math.random() * 49) + 1);

        if (grid[food["y"]][food["x"]]["colour"] == 0) {

            if ((food["x"] > 0 && food["x"] > 1) && (food["y"] > 0 && food["y"] > 1)) {

                if ((food["x"] < 48 && food["x"] < 49) && (food["y"] < 48 && food["y"] < 49)) {

                    grid[food["y"]][food["x"]]["colour"] = 2;
                    grid[food["y"]][food["x"]]["type"] = "f";

                    //alert(food["y"] + "Y - " + food["x"] + "X")

                    exit = true;

                }
                
            }

        }

    }

}

function eatFood () {

    if (headPositionY == food["y"] && headPositionX == food["x"]) {

        //alert ("food eaten")

        grow ();

        generateFood();
            
    } 

}

function grow () {

    snakeLength ++;

    partNumber = snakeLength - 1;

    tailPart = "t" + partNumber;

    partNumberBefore = partNumber - 1;

    partNumberBeforeBefore = partNumber - 2;

    tailPartBefore = "t" + partNumberBefore;

    tailPartBeforeBefore = "t" + partNumberBeforeBefore;

    snakeTailParts[tailPart] = new Array();

    if (snakeTailParts[tailPartBefore]["tailPartX"] < snakeTailParts[tailPartBeforeBefore]["tailPartX"]) {

        newPartX = snakeTailPartBeforeX - 1;
        newPartY = snakeTailPartBeforeY;

        snakeTailParts[tailPart]["tailPartX"] = newPartX;
        snakeTailParts[tailPart]["tailPartY"] = newPartY;

        grid[newPartY][newPartX]["colour"] = 1;
        grid[newPartY][newPartX]["type"] = tailPart;

    }
    
    if (snakeTailParts[tailPartBefore]["tailPartX"] > snakeTailParts[tailPartBeforeBefore]["tailPartX"]) {

        newPartX = snakeTailPartBeforeX + 1;
        newPartY = snakeTailPartBeforeY;

        snakeTailParts[tailPart]["tailPartX"] = newPartX;
        snakeTailParts[tailPart]["tailPartY"] = newPartY;

        grid[newPartY][newPartX]["colour"] = 1;
        grid[newPartY][newPartX]["type"] = tailPart;

    }

    if (snakeTailParts[tailPartBefore]["tailPartY"] < snakeTailParts[tailPartBeforeBefore]["tailPartY"]) {

        newPartX = snakeTailPartBeforeX;
        newPartY = snakeTailPartBeforeY - 1;

        snakeTailParts[tailPart]["tailPartX"] = newPartX;
        snakeTailParts[tailPart]["tailPartY"] = newPartY;

        grid[newPartY][newPartX]["colour"] = 1;
        grid[newPartY][newPartX]["type"] = tailPart;

    }

    if (snakeTailParts[tailPartBefore]["tailPartY"] > snakeTailParts[tailPartBeforeBefore]["tailPartY"]) {

        newPartX = snakeTailPartBeforeX;
        newPartY = snakeTailPartBeforeY + 1;

        snakeTailParts[tailPart]["tailPartX"] = newPartX;
        snakeTailParts[tailPart]["tailPartY"] = newPartY;

        grid[newPartY][newPartX]["colour"] = 1;
        grid[newPartY][newPartX]["type"] = tailPart;

    }

}

function checkIfDead () {

    if (headPositionY == 1 || headPositionY == 48) {

        clearInterval(reRenderer);

    }

    if (headPositionX == 1 || headPositionX == 48) {

        clearInterval(reRenderer);

    }

}

//Draw the grid before the interval code runs the first time
draw ();
generateFood();

var reRenderer = setInterval(function () {

    moveSnakeForward(direction);
    checkIfEatingSelf();
    eatFood();
    draw ();

}, 500);

headPositionX = gridMiddleX;
headPositionY = gridMiddleY;

function moveSnakeForward (direction) {

    

    height = 0;
    width = 0;

    //Find the head of the snake in the grid

    while (height < gridSizeHeight) {

        width = 0;

        while (width < gridSizeWidth) {

            if (grid[height][width]["colour"] == 1) {

                if (grid[height][width]["type"] == "h") {

                    headPositionX = width;
                    headPositionY = height;

                }

            }

            width++;

        }

        height++;
        
    }

    //Get all tail parts of the snake

    snakeTailParts = new Array();

    height = 0;
    width = 0;
    tailPartNumber = 1;

    while (tailPartNumber <= snakeLength) {

        height = 0;

        while (height < gridSizeHeight) {

            width = 0;

            while (width < gridSizeWidth) {

                if (grid[height][width]["colour"] == 1) {

                    tailPart = "t" + tailPartNumber;

                    if (grid[height][width]["type"] === tailPart) {

                        snakeTailParts[tailPart] = new Array();

                        //snakeTailParts[tailPart]["tailPart"] = tailPart;
                        snakeTailParts[tailPart]["tailPartX"] = width;
                        snakeTailParts[tailPart]["tailPartY"] = height;

                        console.log(snakeTailParts);

                    }

                }

                width++;

            }

            height++;

        }

        tailPartNumber++;

    }

    //Move the head of the snake

    grid[headPositionY][headPositionX]["colour"] = 0;
    grid[headPositionY][headPositionX]["type"] = 0;

    if (direction === "up") {

        newHeadPositionY = headPositionY - 1;
        newHeadPositionX = headPositionX;

    }
    else if (direction === "left") {

        newHeadPositionY = headPositionY;
        newHeadPositionX = headPositionX - 1;

    }
    else if (direction === "right") {

        newHeadPositionY = headPositionY;
        newHeadPositionX = headPositionX + 1;

    }
    else {

        newHeadPositionY = headPositionY + 1;
        newHeadPositionX = headPositionX;

    }

    grid[newHeadPositionY][newHeadPositionX]["colour"] = 1;
    grid[newHeadPositionY][newHeadPositionX]["type"] = "h";

    //Move the first tail part to the previous position of the head

    firstSnakeTailPartPositionX = snakeTailParts["t1"]["tailPartX"];
    firstSnakeTailPartPositionY = snakeTailParts["t1"]["tailPartY"];

    grid[firstSnakeTailPartPositionY][firstSnakeTailPartPositionX]["colour"] = 0;
    grid[firstSnakeTailPartPositionY][firstSnakeTailPartPositionX]["type"] = 0;

    grid[headPositionY][headPositionX]["colour"] = 1;
    grid[headPositionY][headPositionX]["type"] = "t1";

    //Move every next tail part to the position before it

    counter = 2;

    while (counter < snakeLength) {

        tailPart = "t" + counter;
        counterMinusOne = counter - 1;
        tailPartBefore = "t" + counterMinusOne;

        snakeTailPartBeforeX = snakeTailParts[tailPartBefore]["tailPartX"];
        snakeTailPartBeforeY = snakeTailParts[tailPartBefore]["tailPartY"];

        snakeTailPartPositionX = snakeTailParts[tailPart]["tailPartX"];
        snakeTailPartPositionY = snakeTailParts[tailPart]["tailPartY"];

        grid[snakeTailPartPositionY][snakeTailPartPositionX]["colour"] = 0;
        grid[snakeTailPartPositionY][snakeTailPartPositionX]["type"] = 0;

        grid[snakeTailPartBeforeY][snakeTailPartBeforeX]["colour"] = 1;
        grid[snakeTailPartBeforeY][snakeTailPartBeforeX]["type"] = tailPart;

        counter++;

    }

    checkIfDead();

}

//Show the grid array in the console before drawing it (Used for debuging)
console.log(grid);

//Draw the grid

function draw () {

    height = 0;
    width = 0;

    while (height < gridSizeHeight) {

        width = 0;

        while (width < gridSizeWidth) {

            if (grid[height][width]["colour"] == 0) {

                posY = height * 10;
                posX = width * 10;

                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(posX, posY, 10, 10);

            }
            else if (grid[height][width]["colour"] == 1) {

                posY = height * 10;
                posX = width * 10;

                if (grid[height][width]["type"] === "h") {

                    ctx.fillStyle = "#AA0000";

                }
                else {

                    ctx.fillStyle = "#FF0000";

                }

                ctx.fillRect(posX, posY, 10, 10);

            }
            
            if (grid[height][width]["colour"] == 2) {

                posY = height * 10;
                posX = width * 10;

                if (grid[height][width]["type"] === "f") {

                    ctx.fillStyle = "#DDDD00";

                }

                ctx.fillRect(posX, posY, 10, 10);

            }

            if (height == 0 || height == 1) {

                posY = height * 10;
                posX = width * 10;

                ctx.fillStyle = "#555555";

                ctx.fillRect(posX, posY, 10, 10);

            }

            if (height == 48 || height == 49) {

                posY = height * 10;
                posX = width * 10;

                ctx.fillStyle = "#555555";

                ctx.fillRect(posX, posY, 10, 10);

            }

            if (width == 0 || width == 1) {

                posY = height * 10;
                posX = width * 10;

                ctx.fillStyle = "#555555";

                ctx.fillRect(posX, posY, 10, 10);

            }

            if (width == 48 || width == 49) {

                posY = height * 10;
                posX = width * 10;

                ctx.fillStyle = "#555555";

                ctx.fillRect(posX, posY, 10, 10);

            }

            width++;

        }

        height++;

    }

}

