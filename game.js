let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let difficulty = document.getElementById('difficulty').value;



// defining properties of the paddle
let paddle ={
    x : canvas.width /2 - 50,
    y : canvas.height -30,
    width : 100,
    height : 20,
    color : 'rgb(3, 115, 252)',
    speed : 20
}

// defining properties of the ball
 let ball ={
    x: Math.random() *canvas.width,
    y: 0,
    radius: 10,
    color: 'red',
    speed : 3
 }

 let score = 0;

const drawScore = () => {
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: '+score,40,20); // 10 and 20 is the starting pixel from left and top
 }

const drawPaddle = () =>{
    //set the color of the paddle
    ctx.fillStyle = paddle.color;
    // creates the rectangle with x and y index, width and height as the parameters
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}


const drawBall = () => {
    ctx.beginPath(); // starts the path
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // creates the circle with x and y index, radius, start angle and end angle as the parameters
    ctx.fillStyle = ball.color; // sets the color of the ball
    ctx.fill();
    ctx.closePath(); // closes the path

}

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas
}

let gameOver = false;
const drawGameOver =() => {
    clearCanvas();
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over! Your score is: ' + score, canvas.width / 2, canvas.height / 2);
}




const update = () => {

    
    if (gameOver) {
        // Display game over message and stop updating
        drawGameOver();
        document.getElementById('gameOverDiv').style.display = 'block';
        return; // Exit the function to stop further updates
    }

    clearCanvas() // clears the canvas
    drawPaddle()
    drawScore()
    drawBall()
    
    //moves the ball by changing its y index.
    ball.y += ball.speed;

    // checks if the ball hits the paddle
    if(ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width){
            ball.y =0;
            ball.x = Math.random()*canvas.width;
            score++;
        }
    if(ball.y + ball.radius > canvas.height){
        gameOver = true; // Set game over state
    }
    
    // makes the ball 
    requestAnimationFrame(update);
}

const movePaddle = (event) => {
    switch(event.key){
        case 'ArrowLeft':
            if(paddle.x>0){
                paddle.x -= paddle.speed;
            }
            break;
        case 'ArrowRight':
            if(paddle.x < canvas.width - paddle.width){
                paddle.x += paddle.speed;
            }
            break;
    } 
}
window.addEventListener('keydown', movePaddle);

document.getElementById('tryAgainBtn').addEventListener('click', () => {
    // resetting game variables
    gameOver = false;
    score = 0;
    ball.x = Math.random() * canvas.width;
    ball.y = 0;

    // hide the game over message
    document.getElementById('gameOverDiv').style.display = 'none';
    update();
});

document.getElementById('difficulty').addEventListener('change', (event) => {
    difficulty = event.target.value;
    switch (difficulty) {
        case 'easy':
            ball.speed = 3;
            break;
        case 'medium':
            ball.speed = 5;
            break;
        case 'hard':
            ball.speed = 6;
            break;
    }
});
update(); 


