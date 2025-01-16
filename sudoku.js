function initSudoku() {
  console.log('Initializing Sudoku');
  
  // Clear any existing game content in the game container
  const sudokuContainer = document.getElementById('gameContainer');
  sudokuContainer.innerHTML = '';

  // Create the Sudoku grid (9x9 grid)
  const grid = document.createElement('div');
  grid.classList.add('sudoku-grid');
  
  // Create 81 cells (9x9 grid) for the Sudoku puzzle
  for (let i = 0; i < 81; i++) {
    const cell = document.createElement('div');
    cell.classList.add('sudoku-cell');
    cell.dataset.index = i;

    // Create an input element for each cell (number input, limited to 1-9)
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = 9;
    input.maxLength = 1;
    cell.appendChild(input);
    grid.appendChild(cell);
  }

  // Add the Sudoku grid to the container
  sudokuContainer.appendChild(grid);

  // Create a button to check if the solution is correct
  const checkButton = document.createElement('button');
  checkButton.textContent = 'Check Solution';
  checkButton.addEventListener('click', checkSudokuSolution);
  sudokuContainer.appendChild(checkButton);

  // Create a button to reset the game
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Game';
  resetButton.addEventListener('click', resetSudoku);
  sudokuContainer.appendChild(resetButton);

  console.log('Sudoku Initialized');
}

// Function to check if the Sudoku solution is correct
function checkSudokuSolution() {
  const cells = document.querySelectorAll('.sudoku-cell input');
  
  // A predefined correct solution (this is a sample 9x9 Sudoku puzzle solution)
  const correctSolution = [
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,
    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,
    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
  ];

  let isValid = true;
  let filledCellsCount = 0;

  // Loop through the cells and compare with the correct solution
  cells.forEach((input, index) => {
    if (input.value !== '') {
      filledCellsCount++;
      // If the value doesn't match the correct solution, mark it as incorrect
      if (parseInt(input.value) !== correctSolution[index]) {
        isValid = false;
        input.style.borderColor = 'red'; // Highlight incorrect cells in red
      } else {
        input.style.borderColor = ''; // Reset border color if the solution is correct
      }
    }
  });

  // If all cells are filled and the solution is correct, show a success message
  if (filledCellsCount === 81 && isValid) {
    alert('Congratulations! You solved the Sudoku!');
  } else if (filledCellsCount === 81) {
    alert('Incorrect solution. Try again.');
  }
}

// Function to reset the Sudoku game
function resetSudoku() {
  const cells = document.querySelectorAll('.sudoku-cell input');

  // Reset the input values and remove any border color highlights
  cells.forEach(input => {
    input.value = '';
    input.style.borderColor = ''; // Reset border color
  });

  console.log('Sudoku game reset.');
}

