const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "white";
const snakeColor="lightgreen";
const snakeBorder="black";
const foodColor="red";
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let snake =[
    {x: unitSize*4, y:0},
    {x: unitSize*3, y:0},
    {x: unitSize*2, y:0},
    {x: unitSize, y:0},
    {x: 0, y:0}

];

let score = 0;

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

// starts the game
function gameStart(){
    running = true;
    createFood();
    drawFood();
    nextTick();
};
// main game loop
function nextTick(){
    if(running){
        setTimeout(() =>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    // generates the random coordinates for the food
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max-min) + min ) /unitSize)*unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
    
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    snake.unshift(head);
    // if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();

    }
    // deletes the tail for each movement forward, if the food is not eaten, 
    // if eaten lets the tail be there 
    else{
        snake.pop();
    }
};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    // draws the snake parts by iterating through the snake array
    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    
    const keyPressed = event.keyCode;
    
    // keycodes
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    // checks for current direction by checkinng the current velocity in x and y
    const goingUp = yVelocity == -unitSize;
    const goingDown = yVelocity == unitSize;
    const goingRight = xVelocity == unitSize;
    const goingLeft = xVelocity == -unitSize;

    switch (true) {
        case (keyPressed === LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed === UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed === RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed === DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){
    // for boundaries
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth ):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
        case (snake[0].y < 0 ):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        // if head == any body part
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running = false;
            break;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', gameWidth/2, gameHeight/2);
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake =[
        {x: unitSize*4, y:0},
        {x: unitSize*3, y:0},
        {x: unitSize*2, y:0},
        {x: unitSize, y:0},
        {x: 0, y:0}
    
    ];
    gameStart();
};