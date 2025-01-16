document.addEventListener('DOMContentLoaded', function() {
  // Event listeners for game selection buttons
  document.getElementById('ticTacToeBtn').addEventListener('click', loadTicTacToe);
  document.getElementById('sudokuBtn').addEventListener('click', loadSudoku);
});

function loadGame(gameName) {
  // Get the game container
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = ''; // Clear previous game content

  // Dynamically load the game-specific CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${gameName}/${gameName}.css`;  // Dynamically load the correct CSS file
  document.head.appendChild(link);

  // Dynamically load the game-specific JS
  const script = document.createElement('script');
  script.src = `${gameName}/${gameName}.js`;  // Dynamically load the correct JS file
  script.onload = () => {
    if (gameName === 'ticTacToe') {
      initTicTacToe();  // Initialize Tic Tac Toe
    } else if (gameName === 'sudoku') {
      initSudoku();  // Initialize Sudoku
    }
  };
  document.body.appendChild(script);
}

function loadTicTacToe() {
  loadGame('ticTacToe');  // Load Tic Tac Toe game
}

function loadSudoku() {
  loadGame('sudoku');  // Load Sudoku game
}