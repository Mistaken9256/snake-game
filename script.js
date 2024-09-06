const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size
canvas.width = 600;
canvas.height = 600;

const box = 15;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let apple = { x: Math.floor(Math.random() * canvas.width / box) * box, y: Math.floor(Math.random() * canvas.height / box) * box };
let powerUp = { x: Math.floor(Math.random() * canvas.width / box) * box, y: Math.floor(Math.random() * canvas.height / box) * box };
let score = 0;
let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from localStorage
let gamePaused = false;
let gameInterval;

// Color settings (initially green)
let snakeColor = `rgb(0, 255, 0)`;

// Start the game
function startGame() {
    gameInterval = setInterval(update, 100);
}

function pauseGame() {
    if (gamePaused) {
        startGame();
    } else {
        clearInterval(gameInterval);
    }
    gamePaused = !gamePaused;
}

document.getElementById('pause').addEventListener('click', pauseGame);
document.getElementById('restart').addEventListener('click', restartGame);

// Function to update snake color
document.getElementById('red').addEventListener('input', updateSnakeColor);
document.getElementById('green').addEventListener('input', updateSnakeColor);
document.getElementById('blue').addEventListener('input', updateSnakeColor);

function updateSnakeColor() {
    const red = document.getElementById('red').value;
    const green = document.getElementById('green').value;
    const blue = document.getElementById('blue').value;
    snakeColor = `rgb(${red}, ${green}, ${blue})`;
}

// Main update function
function update() {
    if (gamePaused) return;
    drawBoard();
    moveSnake();
    drawSnake();
    drawApple();
    drawPowerUp();
    checkAppleCollision();
    checkPowerUpCollision();
    checkCollision();
    drawScore();
}

function drawBoard() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, box, box);
}

function drawPowerUp() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(powerUp.x, powerUp.y, box, box);
}

function moveSnake() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    snake.unshift({ x: headX, y: headY });
    snake.pop();
}

// Check for collision with the apple
function checkAppleCollision() {
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        score++;
        apple = { x: Math.floor(Math.random() * canvas.width / box) * box, y: Math.floor(Math.random() * canvas.height / box) * box };
        snake.push({});
    }
}

// Check for collision with the power-up
function checkPowerUpCollision() {
    if (snake[0].x === powerUp.x && snake[0].y === powerUp.y) {
        speedBoost();
        powerUp = { x: Math.floor(Math.random() * canvas.width / box) * box, y: Math.floor(Math.random() * canvas.height / box) * box };
    }
}

// Speed boost
function speedBoost() {
    clearInterval(gameInterval);
    gameInterval = setInterval(update, 50);
    setTimeout(() => {
        clearInterval(gameInterval);
        gameInterval = setInterval(update, 100);
    }, 5000);
}

// Prevent snake from reversing direction
document.addEventListener("keydown", (event) => {
    if ((event.key === "ArrowUp" || event.key === "w") && direction !== "DOWN") direction = "UP";
    else if ((event.key === "ArrowDown" || event.key === "s") && direction !== "UP") direction = "DOWN";
    else if ((event.key === "ArrowLeft" || event.key === "a") && direction !== "RIGHT") direction = "LEFT";
    else if ((event.key === "ArrowRight" || event.key === "d") && direction !== "LEFT") direction = "RIGHT";
});

// Check for collisions with the wall or the snake itself
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
    }
}

// Handle game over
function gameOver() {
    clearInterval(gameInterval);
    saveHighScore();
    alert(`Game Over! Your score was ${score}. High Score: ${highScore}`);
    location.reload();
}

// Restart game function
function restartGame() {
    saveHighScore(); // Save the high score before restarting
    location.reload(); // Reload the page to restart the game
}

// Save high score
function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
}

// Draw score and high score
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`High Score: ${highScore}`, 10, 60);
}

// Listen for when the tab is closed or refreshed
window.addEventListener("beforeunload", saveHighScore);

// Start the game
startGame();
