const winner = document.getElementById('winner');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const turnInfo = document.getElementById('turnInfo');

const players =
{
    x: 'x',
    o: 'o',
}

let currentPlayer = '';
let isGameRunning = false;

let boardState = Array(9).fill('');
const winLines =// Победные схемы
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];

function initializeGame()
{
    cells.forEach( cell => {
        cell.addEventListener('click', clickCell);
    })
    restartButton.addEventListener('click', restartGame);
}

function startGame()
{
    isGameRunning = true;
    cells.forEach( cell => cell.textContent = '');
    winner.textContent = '';
    currentPlayer = players.x;
    turnInfo.textContent = `It's ${currentPlayer}'s turn`
}

function clickCell()
{
    if( !isGameRunning )// Проверка идет ли игра
    {
        return;
    }
    if( this.textContent )
    {
        return;
    }

    this.textContent = currentPlayer;
    const cellIndex = this.dataset.cellIndex;
    boardState[cellIndex] = currentPlayer;

    if( checkGameOver() )// Проверка на победителя или ничью
    {
        return finishGame();
    }

    currentPlayer = (currentPlayer === players.x) ? players.o : players.x;
    turnInfo.textContent = `It's ${currentPlayer}'s turn`;
}

function checkLine(line)
{
    const [a, b, c] = line;

    const cellA = boardState[a];
    const cellB = boardState[b];
    const cellC = boardState[c];

    if( [cellA, cellB, cellC].includes('') )// Проверка на пустую строку
    {
        return false;
    }
    return cellA === cellB && cellB === cellC;
}

function checkGameOver()// Проверка на победителя или ничью
{
    for( const line of winLines )
    {
        if( checkLine(line) )
        {
            winner.textContent = `${currentPlayer} won !!!`;
            return true;
        }
    }
    if( !boardState.includes('') )// Если все ячейки заполнены
    {
        winner.textContent = 'Draw!!!';
        return true;
    }
}

function finishGame()
{
    isGameRunning = false;
    turnInfo.textContent = '';
}

function restartGame()
{
    finishGame();
    boardState = Array(9).fill('');
    startGame();
}
window.addEventListener('load', () => {
    initializeGame();
    startGame();
});


