//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

//speed of the snake
var velocityX = 0;
var velocityY = 0;

//body of the snake 
var snakeBody = [];

//food 
var foodX;
var foodY;

//gameover 
var gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d"); // for drawing on the board

    placeFood();
    document.addEventListener("keyup", handleKeyPress);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }

    // Draw the board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    // Check if the snake eats the food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); // Add new segment
        placeFood();
    }

    // Move the snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Update snake head position
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;

    // Draw the snake
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    // Check for collision with walls
    if (snakeX < 0 || snakeX >= cols * blocksize || snakeY < 0 || snakeY >= rows * blocksize) {
        endGame();
    }

    // Check for collision with the body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            endGame();
        }
    }
}

function handleKeyPress(e) {
    if (!gameOver) {
        changeDirection(e);
    } else if (e.code === "Enter") {
        restartGame();
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    do {
        foodX = Math.floor(Math.random() * cols) * blocksize;
        foodY = Math.floor(Math.random() * rows) * blocksize;
    } while (snakeBody.some(segment => segment[0] === foodX && segment[1] === foodY));
}

function drawSnakePart(x, y) {
    context.fillStyle = "lime";
    context.fillRect(x, y, blocksize, blocksize);

    // Apply CSS class for snake glow animation
    board.classList.add('snake');
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    // Apply CSS class for glowing food
    board.classList.add('food');
}

function drawSnakePart(x, y) {
    context.beginPath();
    context.arc(x + blocksize / 2, y + blocksize / 2, blocksize / 2, 0, 2 * Math.PI); // Circular segments
    context.fillStyle = "green";
    context.fill();
    context.strokeStyle = "#004d00"; // Border color
    context.lineWidth = 2;
    context.stroke();
}


function update() {
    if (gameOver) {
        return;
    }

    // Clear the board
    context.clearRect(0, 0, board.width, board.height);

    // Draw food
    drawFood();

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]); // Add new segment
        placeFood();
    }

 
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;


    drawSnakePart(snakeX, snakeY);

    for (let i = 0; i < snakeBody.length; i++) {
        drawSnakePart(snakeBody[i][0], snakeBody[i][1]);
    }


    if (snakeX < 0 || snakeX >= cols * blocksize || snakeY < 0 || snakeY >= rows * blocksize) {
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            endGame();
        }
    }
}







function endGame() {
    gameOver = true;
    alert("Game Over! Press Enter to restart.");
}

function restartGame() {
    // Reset the game state
    snakeX = blocksize * 5;
    snakeY = blocksize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    placeFood();
}
