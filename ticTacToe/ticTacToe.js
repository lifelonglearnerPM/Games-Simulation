let currentPlayer = 'X';
let gameBoardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let statusDisplay;
let cells;

function resetGame() {
  gameBoardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.innerText = `${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('highlight'); // Remove highlight class if reset
  });

  const winningLine = document.querySelector('.winning-line');
  if (winningLine) {
    winningLine.remove();
  }
}

function initTicTacToe() {
  console.log('Initializing Tic Tac Toe');

  const gameContainer = document.getElementById('gameContainer');

  // Clear any existing game content
  gameContainer.innerHTML = '';

  // Create the game board
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  gameContainer.appendChild(gameBoard);

  // Create and append the cells to the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;  // Set a unique index for each cell
    gameBoard.appendChild(cell);
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
        highlightWinningCells(pattern); // Highlight the winning cells
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

  // Highlight the winning line
  const highlightWinningLine = (pattern) => {
    const cells = document.querySelectorAll('.cell');
    const [a, b, c] = pattern;

    // Get cell positions
    const rectA = cells[a].getBoundingClientRect();
    const rectB = cells[b].getBoundingClientRect();
    const rectC = cells[c].getBoundingClientRect();

    const winningLine = document.createElement('div');
    winningLine.classList.add('winning-line');
    document.body.appendChild(winningLine);

    // Horizontal line logic
    if (rectA.top === rectB.top && rectB.top === rectC.top) {
      const left = Math.min(rectA.left, rectB.left, rectC.left);
      const right = Math.max(rectA.right, rectB.right, rectC.right);
      const top = rectA.top + rectA.height / 2;

      winningLine.style.width = `${right - left}px`;
      winningLine.style.top = `${top}px`;
      winningLine.style.left = `${left}px`;
      winningLine.classList.add('horizontal');
    }
    // Vertical line logic
    else if (rectA.left === rectB.left && rectB.left === rectC.left) {
      const top = Math.min(rectA.top, rectB.top, rectC.top);
      const bottom = Math.max(rectA.bottom, rectB.bottom, rectC.bottom);
      const left = rectA.left + rectA.width / 2;

      winningLine.style.height = `${bottom - top}px`;
      winningLine.style.left = `${left}px`;
      winningLine.style.top = `${top}px`;
      winningLine.classList.add('vertical');
    }
    // Diagonal (top-left to bottom-right)
    else if (rectA.top < rectB.top && rectB.top < rectC.top && rectA.left < rectB.left && rectB.left < rectC.left) {
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
    // Diagonal (top-right to bottom-left)
    else if (rectA.top < rectB.top && rectB.top < rectC.top && rectA.left > rectB.left && rectB.left > rectC.left) {
      const left = rectC.left + rectC.width / 2;
      const top = rectC.top + rectC.height / 2;
      const right = rectA.left + rectA.width / 2;
      const bottom = rectA.top + rectA.height / 2;

      winningLine.style.width = `${Math.sqrt(Math.pow(right - left, 2) + Math.pow(bottom - top, 2))}px`;
      winningLine.style.transformOrigin = 'center';
      winningLine.style.transform = `rotate(${Math.atan2(bottom - top, right - left) * 180 / Math.PI}deg)`;
      winningLine.style.top = `${top}px`;
      winningLine.style.left = `${left}px`;
      winningLine.classList.add('diagonal');
    }
  };

  // Highlight the winning cells
  const highlightWinningCells = (pattern) => {
    pattern.forEach(index => {
      const cell = cells[index];
      cell.classList.add('highlight'); // Apply highlight class to winning cells
    });
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
