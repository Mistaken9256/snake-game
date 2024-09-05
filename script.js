const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let dx = scale;
let dy = 0;
let isRunning = true;

function setup() {
    snake = [
        { x: Math.floor(columns / 2) * scale, y: Math.floor(rows / 2) * scale }
    ];
    food = spawnFood();
    document.addEventListener('keydown', changeDirection);
    setInterval(update, 100);
}

function update() {
    if (!isRunning) return;

    moveSnake();
    if (checkCollision()) {
        isRunning = false;
        alert('Game Over!');
        return;
    }

    if (checkFoodCollision()) {
        snake.push({...snake[snake.length - 1]});
        food = spawnFood();
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(part > ctx.fillRect(part.x, part.y, scale, scale));
    
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -scale;
    } else if (key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = scale;
    } else if (key === 'ArrowLeft' && dx === 0) {
        dx = -scale;
        dy = 0;
    } else if (key === 'ArrowRight' && dx === 0) {
        dx = scale;
        dy = 0;
    }
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(part > part.x === head.x && part.y === head.y)
    );
}

function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function spawnFood() {
    let foodPosition;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
    } while (snake.some(part > part.x === foodPosition.x && part.y === foodPosition.y));
    return foodPosition;
}

setup();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let dx = scale;
let dy = 0;
let isRunning = true;

function setup() {
    snake = [
        { x: Math.floor(columns / 2) * scale, y: Math.floor(rows / 2) * scale }
    ];
    food = spawnFood();
    document.addEventListener('keydown', changeDirection);
    setInterval(update, 100);
}

function update() {
    if (!isRunning) return;

    moveSnake();
    if (checkCollision()) {
        isRunning = false;
        alert('Game Over!');
        return;
    }

    if (checkFoodCollision()) {
        snake.push({...snake[snake.length - 1]});
        food = spawnFood();
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(part > ctx.fillRect(part.x, part.y, scale, scale));
    
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -scale;
    } else if (key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = scale;
    } else if (key === 'ArrowLeft' && dx === 0) {
        dx = -scale;
        dy = 0;
    } else if (key === 'ArrowRight' && dx === 0) {
        dx = scale;
        dy = 0;
    }
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(part > part.x === head.x && part.y === head.y)
    );
}

function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function spawnFood() {
    let foodPosition;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
    } while (snake.some(part > part.x === foodPosition.x && part.y === foodPosition.y));
    return foodPosition;
}

setup();
