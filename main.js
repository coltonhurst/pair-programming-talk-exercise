/* ----- global vars ----- */
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const pi = 3.1415926536;
const paddle = { 
    width: 100,
    height: 20,
    xLoc: (canvas.width / 2) - 49.5,
    yLoc: canvas.height - 39.5,
    speed: 5
};
let keyboard = {
    leftPressed: false,
    rightPressed: false
}

/* ----- start ----- */
draw();
document.addEventListener("keydown", keyPressedHandler, false);
document.addEventListener("keyup", keyReleasedHandler, false);

/* ----- drawing funcs ----- */
function draw() {
    clearScreen();
    drawPaddle();

    // paddle movement
    if (keyboard.rightPressed) {
        const currentXRightEdgeLoc = paddle.xLoc + paddle.width;
        const futureXRightEdgeLoc = currentXRightEdgeLoc + paddle.speed;

        if (futureXRightEdgeLoc < canvas.width) {
            paddle.xLoc += paddle.speed;
        } else if ((futureXRightEdgeLoc > canvas.width) && (currentXRightEdgeLoc < canvas.width)) {
            paddle.xLoc = canvas.width - paddle.width - 0.5;
        }
    } else if (keyboard.leftPressed) {
        const currentXLeftEdgeLoc = paddle.xLoc;
        const futureXLeftEdgeLoc = currentXLeftEdgeLoc - paddle.speed;

        if (futureXLeftEdgeLoc > 0) {
            paddle.xLoc -= paddle.speed;
        } else if ((futureXLeftEdgeLoc < 0) && (currentXLeftEdgeLoc > 0)) {
            paddle.xLoc = 0.5;
        }
    }

    requestAnimationFrame(draw);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.xLoc, paddle.yLoc, paddle.width, paddle.height);
    ctx.stroke();
    ctx.closePath();
}

/* ----- helper funcs ----- */
function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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