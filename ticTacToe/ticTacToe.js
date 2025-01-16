// Declare variables outside of functions so they're in the correct scope
let currentPlayer = 'X';
let gameBoardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let statusDisplay;
let cells;

// Define the resetGame function first
function resetGame() {
  gameBoardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.innerText = `${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('highlight'); // Remove highlight class from all cells
  });

  const winningLine = document.querySelector('.winning-line');
  if (winningLine) {
    winningLine.remove();
  }
}

function initTicTacToe() {
  console.log('Initializing Tic Tac Toe');

  // Create the game board container dynamically
  const gameContainer = document.getElementById('gameContainer');

  // Clear any existing game content
  gameContainer.innerHTML = '';

  // Add the game board
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  gameContainer.appendChild(gameBoard);

  // Create and append the rows and cells
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    gameBoard.appendChild(row);

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i * 3 + j;  // Set a unique index for each cell
      row.appendChild(cell);
    }
  }

  // Add the reset button
  const resetButton = document.createElement('button');
  resetButton.id = 'resetBtn';
  resetButton.textContent = 'Reset Game';
  gameContainer.appendChild(resetButton);

  // Add status display for current turn
  statusDisplay = document.createElement('div');
  statusDisplay.id = 'status';
  statusDisplay.innerText = `${currentPlayer}'s turn`;
  gameContainer.appendChild(statusDisplay);

  // Event listeners for the reset button and cell clicks
  cells = document.querySelectorAll('.cell');

  resetButton.addEventListener('click', resetGame);

  cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell.dataset.index));
  });

  // Check if someone has won
  const checkWinner = () => {
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (gameBoardState[a] && gameBoardState[a] === gameBoardState[b] && gameBoardState[a] === gameBoardState[c]) {
        highlightWinningLine(pattern);
        return true;
      }
    }

    if (!gameBoardState.includes('')) {
      statusDisplay.innerText = "It's a Draw!";
      gameActive = false;
      return true;
    }

    return false;
  };

  // Highlight the winning line and cells
  const highlightWinningLine = (pattern) => {
    const cells = document.querySelectorAll('.cell');
    const [a, b, c] = pattern;

    // Add a "highlight" class to the winning cells
    cells[a].classList.add('highlight');
    cells[b].classList.add('highlight');
    cells[c].classList.add('highlight');

    const rectA = cells[a].getBoundingClientRect();
    const rectB = cells[b].getBoundingClientRect();
    const rectC = cells[c].getBoundingClientRect();

    const winningLine = document.createElement('div');
    winningLine.classList.add('winning-line');
    document.body.appendChild(winningLine);

    // Determine the winning line (horizontal, vertical, or diagonal)
    if (rectA.top === rectB.top && rectB.top === rectC.top) {
      const left = Math.min(rectA.left, rectB.left, rectC.left);
      const right = Math.max(rectA.right, rectB.right, rectC.right);
      const top = rectA.top + rectA.height / 2;
      winningLine.style.width = `${right - left}px`;
      winningLine.style.top = `${top}px`;
      winningLine.style.left = `${left}px`;
      winningLine.classList.add('horizontal');
    } else if (rectA.left === rectB.left && rectB.left === rectC.left) {
      const top = Math.min(rectA.top, rectB.top, rectC.top);
      const bottom = Math.max(rectA.bottom, rectB.bottom, rectC.bottom);
      const left = rectA.left + rectA.width / 2;
      winningLine.style.height = `${bottom - top}px`;
      winningLine.style.left = `${left}px`;
      winningLine.style.top = `${top}px`;
      winningLine.classList.add('vertical');
    } else {
      const left = rectA.left + rectA.width / 2;
      const top = rectA.top + rectA.height / 2;
      const right = rectC.left + rectC.width / 2;
      const bottom = rectC.top + rectC.height / 2;

      winningLine.style.width = `${Math.sqrt(Math.pow(right - left, 2) + Math.pow(bottom - top, 2))}px`;
      winningLine.style.transformOrigin = 'center';
      winningLine.style.transform = `rotate(${Math.atan2(bottom - top, right - left) * 180 / Math.PI}deg)`;
      winningLine.style.top = `${top}px`;
      winningLine.style.left = `${left}px`;
      winningLine.classList.add('diagonal');
    }
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (gameBoardState[index] !== '' || !gameActive) return;

    gameBoardState[index] = currentPlayer;
    const cell = cells[index];
    cell.innerText = currentPlayer;

    if (checkWinner()) {
      statusDisplay.innerText = `${currentPlayer} wins!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.innerText = `${currentPlayer}'s turn`;
    }
  };

  console.log('Tic Tac Toe Initialized');
}