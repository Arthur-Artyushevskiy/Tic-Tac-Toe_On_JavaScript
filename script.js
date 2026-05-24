
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const characterBtns = document.querySelectorAll('.character');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let playerOneCharacter = 'X';
let playerTwoCharacter = 'O';
let gameActive = true;
let customCharacterSelected = false;


const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

initializeGame();

function initializeGame() {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
    characterBtns.forEach(character => character.addEventListener('click', handleCharacterClick))
}

function handleCharacterClick(event){
    const clickedCharacter = event.target;
    const characterIndex = clickedCharacter.getAttribute('data-index');

    if(!customCharacterSelected){
        if(characterIndex === '0'){
            currentPlayer = 'O';
            playerOneCharacter = 'O';
            playerTwoCharacter = 'X';
            customCharacterSelected = true;
        }
        else if(characterIndex === '1'){
            currentPlayer = 'T';
            playerOneCharacter = 'T';
            playerTwoCharacter = 'Y';
            customCharacterSelected = true;
        }
        else if(characterIndex === '2'){
            currentPlayer = '🐱';
            playerOneCharacter = '🐱';
            playerTwoCharacter = '🐶';
            customCharacterSelected = true;
        }
    }
    
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');


    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }


    updateCell(clickedCell, cellIndex);

    checkWinner();
}


function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if(currentPlayer === 'X' || currentPlayer === 'O'){
        cell.style.color = currentPlayer === 'X' ? '#dc3545' : '#007bff';
    }
    else if (currentPlayer === 'T' || currentPlayer === 'Y'){
        cell.style.color = currentPlayer === 'T' ? '#28a745' : '#ffc107';
    }
}


function changePlayer(firstCharacter, secondCharacter) {
    currentPlayer = currentPlayer === firstCharacter ? secondCharacter : firstCharacter;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}


function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        

        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        

        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }


    if (!board.includes('')) {
        statusText.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }


    changePlayer(playerOneCharacter, playerTwoCharacter);
}


function restartGame() {
    currentPlayer = 'X';
    playerOneCharacter = 'X';
    playerTwoCharacter = 'O';
    customCharacterSelected = false;
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '#333';
    });
}


