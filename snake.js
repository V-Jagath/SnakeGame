const gameBoard = document.getElementById("gameBoard")
const context = gameBoard.getContext("2d")
const scorevalue = document.getElementById("scoreVal")

// Food
const width = gameBoard.width;
const height = gameBoard.height;

const unit = 20;

let foodX;
let foodY;

// Move Snake

let xVel = unit;
let yVel = 0;
let score = 0;
let active = true;
let started = false;

// Snake

let snake = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 }
];

const startBtn = document.getElementById("startBtn")

startBtn.addEventListener("click", keyPress);

startGame();

function startGame() {
    context.fillStyle = "#FAA533";
    context.fillRect(0, 0, width, height);
    createFood();
    displayFood();
    drawSnake();
}

window.addEventListener("keydown", keyPress);

function createFood() {
    foodX = Math.floor(Math.random() * (width / unit)) * unit;
    foodY = Math.floor(Math.random() * (height / unit)) * unit;
}

function displayFood() {
    context.fillStyle = "black";
    context.fillRect(foodX, foodY, unit, unit)
}

function drawSnake() {
    context.fillStyle = "blue";
    context.strokeStyle = "#000000";
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, unit, unit)
        context.strokeRect(snakePart.x, snakePart.y, unit, unit)
    })
}
function moveSnake() {
    const head = {
        x: snake[0].x + xVel,
        y: snake[0].y + yVel
    };
    snake.unshift(head);
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        scorevalue.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
}

function clearBoard() {
    context.fillStyle = "#F6FF99 ";
    context.fillRect(0, 0, width, height);
}

const restart = document.getElementById("restart");

function nextTick() {
    if (active) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            gameOver();
            nextTick();
        }, 250)
    }
    else {
        clearBoard();
        context.font = "bold 30px serif";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Game Over !!", width / 2, height / 3)
        context.fillText(`Your Score is : ${score}`, width / 2, height / 2)
        restart.style.display = "block";
        restart.style.margin = "auto";
        restart.style.marginTop = "1%";
    }
}


function keyPress(event) {
    startBtn.style.display = "none";
    if (!started) {
        started = true;
        nextTick();
    }
    switch (event.key) {
        case "ArrowLeft":
            if (xVel === 0) {
                xVel = -unit;
                yVel = 0;
            }
            break;
        case "ArrowRight":
            if (xVel === 0) {
                xVel = unit;
                yVel = 0;
            }
            break;
        case "ArrowUp":
            if (yVel === 0) {
                xVel = 0;
                yVel = -unit;
            }
            break;
        case "ArrowDown":
            if (yVel === 0) {
                xVel = 0;
                yVel = unit;
            }
            break;
    }
}

function gameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= width):
        case (snake[0].y < 0):
        case (snake[0].y >= height):
            active = false;
            break;
    }

}

// Restart Button
restart.addEventListener("click", restartGame);
function restartGame() {
    window.location.reload(true)
};

// ✅ MOBILE TOUCH CONTROLS
const upBtn = document.getElementById("ArrowUp");
const downBtn = document.getElementById("ArrowDown");
const leftBtn = document.getElementById("ArrowLeft");
const rightBtn = document.getElementById("ArrowRight");

// Start the game if not started (for first touch)
function startIfNeeded() {
    if (!started) {
        started = true;
        nextTick();
        startBtn.style.display = "none";
    }
}

// Touch button controls
upBtn.addEventListener("touchstart", () => {
    startIfNeeded();
    if (yVel === 0) {
        xVel = 0;
        yVel = -unit;
    }
});

downBtn.addEventListener("touchstart", () => {
    startIfNeeded();
    if (yVel === 0) {
        xVel = 0;
        yVel = unit;
    }
});

leftBtn.addEventListener("touchstart", () => {
    startIfNeeded();
    if (xVel === 0) {
        xVel = -unit;
        yVel = 0;
    }
});

rightBtn.addEventListener("touchstart", () => {
    startIfNeeded();
    if (xVel === 0) {
        xVel = unit;
        yVel = 0;
    }
});

const startBotton = document.getElementById("startBtn");

// Desktop click or Enter key starts the game
startBotton.addEventListener("click", startGameHandler);
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") startGameHandler();
});

function startGameHandler() {
    startBotton.style.display = "none";
    if (!started) {
        started = true;
        nextTick();
    }
}
upBtn.addEventListener("touchstart", () => {
    startGameHandler();
    if (yVel === 0) { xVel = 0; yVel = -unit; }
});
downBtn.addEventListener("touchstart", () => {
    startGameHandler();
    if (yVel === 0) { xVel = 0; yVel = unit; }
});
leftBtn.addEventListener("touchstart", () => {
    startGameHandler();
    if (xVel === 0) { xVel = -unit; yVel = 0; }
});
rightBtn.addEventListener("touchstart", () => {
    startGameHandler();
    if (xVel === 0) { xVel = unit; yVel = 0; }
});
