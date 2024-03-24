let gameBoard = document.getElementById('gameBoard');
let scoreInfo = document.getElementById('scoreInfo');
let restartBtn = document.getElementById('restartBtn');

const context = gameBoard.getContext('2d');// canvas context

// colors
const gameBoardColor = '#131315';
const ballColor = 'crimson';
const firstPaddleColor = '#fff';
const secondPaddleColor = '#fff';

// size
const gameBoardWidth = gameBoard.width;
const gameBoardHeight = gameBoard.height;

const paddleSize = 
{
    width: 25,
    height: 120
}

// ball
const ballRadius = 13;
const initialBallSpeed = 5;
let ballSpeed = initialBallSpeed;
const ballInitial =
{
    x: gameBoardWidth / 2,
    y: gameBoardHeight / 2,
}
let ball = {...ballInitial}

const ballDirection =
{
    x: 0,
    y: 0,
}

// paddle
const paddleSpeed = 40;
let firstPlayerInitial = // left, top
{
    x: 0,
    y: 0,
}
let secondPlayerInitial = //right, bottom
{
    x: gameBoardWidth - paddleSize.width,
    y: gameBoardHeight - paddleSize.height,
}

let firstPaddle = {...firstPlayerInitial};
let secondPaddle = {...secondPlayerInitial};

const moveFirstPaddleKeys =
{
    up: 'w',
    down: 's',
};

const moveSecondPaddleKeys =
{
    up: 'ArrowUp',
    down: 'ArrowDown',
};

// score
let firstPlayerScore = 0;
let secondPlayerScore = 0;

let intervalId;

function drawBoard()
{
    context.fillStyle = gameBoardColor;
    context.fillRect(0, 0, gameBoardWidth, gameBoardHeight);
}

function drawPaddle( paddleX, paddleY, color)
{
    context.fillStyle = color;
    context.fillRect(paddleX, paddleY, paddleSize.width, paddleSize.height);
}

function drawPaddles()
{
    drawPaddle( firstPaddle.x, firstPaddle.y, firstPaddleColor)
    drawPaddle( secondPaddle.x, secondPaddle.y, secondPaddleColor)
}

function drawBall()
{
    context.beginPath()
    context.fillStyle = ballColor;
    context.arc( ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    context.fill();
}

function chooseBallDirection()
{
    return Math.random() < 0.5;
}

function setBallDirection()
{
    if( chooseBallDirection() )
    {
        ballDirection.x = 1;
    }
    else
    {
        ballDirection.x = -1;
    }

    if( chooseBallDirection() )
    {
        ballDirection.y = 1;
    }
    else
    {
        ballDirection.y = -1;
    }
}

function handleBorderCollision()
{
    const topBorderColission = ball.y <= ballRadius;
    const bottomBorderColission = ball.y >= gameBoardHeight - ballRadius;
    if( topBorderColission || bottomBorderColission )
    {
        ballDirection.y *= -1;
    }
}

function checkFirstPaddleCollision()
{
    const xCollision = ball.x <= firstPaddle.x + ballRadius + paddleSize.width;
    const yCollision = ball.y >= firstPaddle.y && ball.y <= firstPaddle.y + paddleSize.height;
    return xCollision && yCollision;
}

function checkSecondPaddleCollision()
{
    const xCollision = ball.x >= secondPaddle.x - ballRadius;
    const yCollision = ball.y >= secondPaddle.y && ball.y <= secondPaddle.y + paddleSize.height;
    return xCollision && yCollision;
}

function handlePaddleCollision()
{
    const firstPaddleCollision = checkFirstPaddleCollision();
    const secondPaddleCollision = checkSecondPaddleCollision();

    if( firstPaddleCollision || secondPaddleCollision )
    {
        ballSpeed *= 1.07;
        ballDirection.x *= -1;
    }
    else
    {
        return;
    }

    if( firstPaddleCollision )
    {
        ball.x = firstPaddle.x + paddleSize.width + ballRadius;
    }
    else if( secondPaddleCollision )
    {
        ball.x = secondPaddle.x - ballRadius;
    }
}
function updateScore()
{
    scoreInfo.textContent = `${firstPlayerScore} : ${secondPlayerScore}`;
}

function handleGoal()
{
    const firstUserGoal = ball.x > gameBoardWidth;
    const secondUserGoal = ball.x < 0;

    if( !firstUserGoal && !secondUserGoal ) { return; }
    if( firstUserGoal ) { firstPlayerScore++; }
    if( secondUserGoal ) { secondPlayerScore++; }

    updateScore()
    ball = {...ballInitial};
    setBallDirection();
    drawBall();
    ballSpeed = initialBallSpeed;
}

function moveBall()
{
    ball.x += ballSpeed * ballDirection.x;
    ball.y += ballSpeed * ballDirection.y;
    handleBorderCollision();
    handlePaddleCollision();
    handleGoal();
}

function movePaddles(ev)
{
    const firstPaddleGoingUp = ev.key === moveFirstPaddleKeys.up;
    const firstPaddleGoingBottom = ev.key === moveFirstPaddleKeys.down;
    const secondPaddleGoingUp = ev.key === moveSecondPaddleKeys.up;
    const secondPaddleGoingBottom = ev.key === moveSecondPaddleKeys.down;

    const canFirstPaddleMoveUp = firstPaddle.y > 0;
    const canFirstPaddleMoveDown = firstPaddle.y < gameBoardHeight - paddleSize.height;
    const canSecondPaddleMoveUp = secondPaddle.y > 0;
    const canSecondPaddleMoveDown = secondPaddle.y < gameBoardHeight - paddleSize.height;

    if( firstPaddleGoingUp && canFirstPaddleMoveUp ) { 
        firstPaddle.y -= paddleSpeed
    } else if( firstPaddleGoingBottom && canFirstPaddleMoveDown ) {
        firstPaddle.y += paddleSpeed
    } else if( secondPaddleGoingUp && canSecondPaddleMoveUp ) {
        secondPaddle.y -= paddleSpeed
    } else if( secondPaddleGoingBottom && canSecondPaddleMoveDown ) {
        secondPaddle.y += paddleSpeed
    }
}

function nextTick()
{
    drawBoard();
    drawPaddles();
    moveBall();
    drawBall();
}

function startGame()
{
    updateScore();
    setBallDirection();
    window.addEventListener('keydown', movePaddles);
    intervalId - setInterval(nextTick, 20);
    restartBtn.addEventListener('click', restarGame);
}

function restartGame()
{
    firstPlayerScore = 0;
    secondPlayerScore = 0;
    scoreInfo.textContent = `${firstPlayerScore} : ${secondPlayerScore}`;
    clearInterval(intervalId);
    ballSpeed = initialBallSpeed;
    ball = {...ballInitial};
    firstPaddle = {...firstPaddleInitial};
    secondPaddle = {...secondPaddleInitial};
    startGame();
}

window.addEventListener('load', startGame);
