const gameBoard = document.querySelector(".gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector(".scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const snakeColor = "blue";
const snakeBorder = "black";
const foodColor = "red";
const foodRadius = 12.5;
const backgroundColor = "black";
const unitSize = 23;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;    //0 that mean we are'nt moving up and down, ani up ma garna lai -unitsize
let foodX;
let foodY;
let score = 0;
let snake = [

    {x:unitSize * 4, y:0},   //5rd part of snake
    {x:unitSize * 3, y:0},  //4rd part of snake
    {x:unitSize * 2, y:0},  //3rd part of snake
    {x:unitSize, y:0},      //2nd part of snake
    {x:0, y:0}              //1st part of snake
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart()

function gameStart(){

    running = true;
    scoreText.textContent = score;
    nextTick();
    createFood();
    drawFood();
}

function nextTick(){

    if(running){

        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            checkGameOver();
            drawSnake();
            nextTick();
        }, 75);
    }

    else{
        displayGameOver();
    }
}

function clearBoard(){

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    
}

function createFood(){

    function randomFood(max, min){

            const ranNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
            return ranNum;
    }
        foodX = randomFood(0, gameWidth - unitSize);
        foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood(){

    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake(){

    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity}; 

        snake.unshift(head);

      if(snake[0].x === foodX && snake[0].y === foodY){   //if food is eaten

            score++;
            scoreText.textContent = score;
            createFood();
      }

      else{

            snake.pop();
      }
}

function drawSnake(){

    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })    
}

function changeDirection(event){

    const keyPressed = event.keyCode;
    const Up = 38;
    const Down = 40;
    const Right = 39;
    const Left = 37;
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    
    switch(true){

       case(keyPressed == Left && !goingRight):
       yVelocity = 0;
       xVelocity = -unitSize;
       break;

       case(keyPressed == Right && !goingLeft):
       yVelocity = 0;
       xVelocity = unitSize;
       break;
       
       case(keyPressed == Up && !goingDown):
       xVelocity = 0;
       yVelocity = -unitSize;
       break;

       case(keyPressed == Down && !goingUp):
       xVelocity = 0;
       yVelocity = unitSize;
       break;
    }
}

function checkGameOver(){

        switch(true){
            
                case(snake[0].x < 0):
                running = false;
                break;

                case(snake[0].x >= gameWidth):
                running = false;
                break;

                case(snake[0].y < 0):
                running = false;
                break;

                case(snake[0].y >= gameHeight):
                running = false;
                break;
        }

        for(let i=1; i < snake.length; i++){

                if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){

                    running = false;
                }

        }
}

function displayGameOver(){

    ctx.font = "50px MV Boli";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame(){
    
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [

        {x:unitSize * 4, y:0},   
        {x:unitSize * 3, y:0},  
        {x:unitSize * 2, y:0},  
        {x:unitSize, y:0},      
        {x:0, y:0}              
    ]
    gameStart();
}

