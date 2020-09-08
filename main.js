/* ----- variables ----- */
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const PI = 3.1415926536;
const paddle = { 
    width: 100,
    height: 5,
    x: (canvas.width / 2) - 49.5,
    y: canvas.height - 39.5,
    speed: 5,
};
let keyboard = {
    leftPressed: false,
    rightPressed: false,
};
let ball = {
    radius: 12,
    x: canvas.width / 2 + 0.5,
    y: canvas.height / 2 + 0.5,
    dx: 1,
    dy: -1,
    canMove: true,
};
let bricks = {
    grid: [],
    rowCount: 8,
    columnCount: 8,
    width: 50,
    height: 15,
    offsetTop: 7.5,
    offsetLeft: 7.5,
    padding: 12,
};
let counts = {
    score: 0,
    lives: 3,
    gameOverShown: false,
}

/* ----- start ----- */
document.addEventListener("keydown", keyPressedHandler, false);
document.addEventListener("keyup", keyReleasedHandler, false);
fillGrid();
draw();

/* ----- collision funcs ----- */
function ballToPaddleCollisonCheck() {
    // IMPLEMENT ME!
}

function ballToBrickCollisonCheck() {
    for (i = 0; i < bricks.rowCount; i++) {
        for (j = 0; j < bricks.columnCount; j++) {
            if (bricks[i][j].active == true) {
                // IMPLEMENT ME!
            }
        }
    }
}

function sideCollisionCheck() {
    if ((ball.x + ball.dx - ball.radius < 0) || (ball.x + ball.dx + ball.radius > canvas.width)) {
        ball.dx = -ball.dx;
    }
}

function topCollisionCheck() {
    if (ball.y + ball.dy - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
}

/* ----- drawing funcs ----- */
function draw() {
    clearScreen();
    drawPaddle();
    drawBricks();

    if (ball.canMove) {
        drawBall();
        ballMovement();
    }

    paddleMovement();

    requestAnimationFrame(draw);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.stroke();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, PI * 2);
    ctx.stroke();
    ctx.closePath();
}

function drawBricks() {
    for (i = 0; i < bricks.rowCount; i++) {
        for (j = 0; j < bricks.columnCount; j++) {
            if (bricks[i][j].active == true) {
                bricks[i][j].x = (j * (bricks.width + bricks.padding)) + bricks.offsetLeft;
                bricks[i][j].y = (i * (bricks.height + bricks.padding)) + bricks.offsetTop;

                ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, bricks.width, bricks.height);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

/* ----- movement funcs ----- */
function paddleMovement() {
    if (keyboard.rightPressed) {
        const currentXRightEdgeLoc = paddle.x + paddle.width;
        const futureXRightEdgeLoc = currentXRightEdgeLoc + paddle.speed;

        if (futureXRightEdgeLoc < canvas.width) {
            paddle.x += paddle.speed;
        } else if ((futureXRightEdgeLoc > canvas.width) && (currentXRightEdgeLoc < canvas.width)) {
            paddle.x = canvas.width - paddle.width - 0.5;
        }
    } else if (keyboard.leftPressed) {
        const currentXLeftEdgeLoc = paddle.x;
        const futureXLeftEdgeLoc = currentXLeftEdgeLoc - paddle.speed;

        if (futureXLeftEdgeLoc > 0) {
            paddle.x -= paddle.speed;
        } else if ((futureXLeftEdgeLoc < 0) && (currentXLeftEdgeLoc > 0)) {
            paddle.x = 0.5;
        }
    }
}

function ballMovement() {
    // move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    sideCollisionCheck();

    // if the ball is in the top section of the screen
    if (ball.y + ball.dy < canvas.height / 2) {
        topCollisionCheck();
        ballToBrickCollisonCheck();
    }
    // if the ball below the screen
    else if (ball.y + ball.dy > canvas.height + (ball.radius * 2)) {
        if (counts.gameOverShown == false) {
            counts.lives--;
            updateLives();

            if (counts.lives < 1) {
                alert("game over");
                ball.canMove = false;
                counts.gameOverShown = true;
            } else {
                ballReset();
            }
        }
    }
    // if the ball is in the bottom half of the screen
    else {
        ballToPaddleCollisonCheck();
    }
}

/* ----- general funcs ----- */
function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fillGrid() {
    for (i = 0; i < bricks.rowCount; i++) {
        bricks[i] = [];
        for (j = 0; j < bricks.columnCount; j++) {
            bricks[i][j] = {x: 0, y: 0, active: true};
        }
    }
}

function ballReset() {
    ball.x = canvas.width / 2 + 0.5;
    ball.y = canvas.height / 2 + 0.5;
}

function updateScore() {
    let s = document.getElementById("score");
    s.innerHTML = counts.score;
}

function updateLives() {
    let l = document.getElementById("lives");
    l.innerHTML = counts.lives;
}

/* ----- handler funcs ----- */
function keyPressedHandler(e) {
    if (e.keyCode == 39) {
        keyboard.rightPressed = true;
    } else if (e.keyCode == 37) {
        keyboard.leftPressed = true;
    }
}

function keyReleasedHandler(e) {
    if (e.keyCode == 39) {
        keyboard.rightPressed = false;
    } else if (e.keyCode == 37) {
        keyboard.leftPressed = false;
    }
}
