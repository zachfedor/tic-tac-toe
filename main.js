/***************
 * Tic Tac Toe *
 ***************/

const PLAYERS = ['X', 'O'];
let grid = [];

/**
 * Onload, set up event listeners
 */
window.onload = () => {
  console.log('onload');
  // get button, add event listener to run init function
};


/**
 * Function to create the board
 */
const drawGrid = (grid) => {
  const tableEl = document.querySelector('table');

  // destroy table to redraw it later
  while (tableEl.firstChild) {
    tableEl.removeChild(tableEl.firstChild);
  }

  grid.forEach((row) => {
    const rowEl = document.createElement('tr');

    row.forEach((cell) => {
      const cellEl = document.createElement('td');

      if (cell) {
        // if the square has been clicked already, show the symbol
        const cellText = document.createTextNode(cell);
        cellEl.appendChild(cellText);
      }
      
      rowEl.appendChild(cellEl);
    });

    tableEl.appendChild(rowEl);
  });
};

/**
 * Function to reset grid
 */
const resetGrid = () => {
  console.log('reset grid');
};

/**
 * Function to add a new symbol
 */
const addSymbol = (symbol, coordinates) => {
  console.log('add symbol:', symbol, coordinates);
  // if space is not empty, return
  // else, add symbol to grid
  // draw grid
};

/**
 * Function to check if square is empty
 */
const isEmpty = (coordinates) => {
  console.log('is empty:', coordinates);
};

/**
 * Function to check for a winner
 */
const isOver = (grid) => {
  // if row match, winner
  // if col match, winner
  // if diag1 match, winner
  // if diag2 match, winner
  // if full, stalemate
  // else, false
};

