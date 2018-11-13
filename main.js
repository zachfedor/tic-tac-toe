/***************
 * Tic Tac Toe *
 ***************/

const PLAYERS = ['x', 'o'];   // A constant to hold both player's symbols
let grid = [];                // A two dimensional array to hold game state
let turn = null;              // A toggle to point at current player, or null


/**
 * On load, set up the game
 */
const init = () => {
  resetGrid();                // Set game state to initial values
  drawGrid();                 // Render the HTML accordingly
  nextTurn();                 // Choose the starting player
};
window.onload = init;


/**
 * Clear an element of all its children
 *
 * @param {Element} el - DOM node, e.g. returned from `.querySelector()`
 */
const clearElement = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};


/**
 * Reset the game state
 */
const resetGrid = () => {
  // TODO: make this dynamic so a user can select the size of the grid
  grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
};


/**
 * Draw the HTML for a given game state
 */
const drawGrid = () => {
  // get the single table element
  const tableEl = document.querySelector('table');
  // destroy table contents to start fresh
  clearElement(tableEl);

  // iterate through each row of the grid
  grid.forEach((row, coordY) => {
    // and create a table row element
    const rowEl = document.createElement('tr');

    // iterate through each column of each row
    row.forEach((cell, coordX) => {
      // and create a table cell element
      const cellEl = document.createElement('td');
      // store its col and row number as coordinates in a plane
      const cellCoords = [coordX, coordY];

      if (cell) {
        // fill the table cell with the appropriate symbol, if it exists
        const cellText = document.createTextNode(cell);
        cellEl.appendChild(cellText);
      } else {
        // if the cell is still empty, add listeners for click and keyboard actions
        cellEl.addEventListener('click', () => addSymbol(PLAYERS[turn], cellCoords));
        cellEl.addEventListener('keyup', (event) => {
          if (event.key === "Enter") {
            addSymbol(PLAYERS[turn], cellCoords);
          }
        });

        // also add a class for styling purposes
        cellEl.className = 'empty';
        // and a tabindex to enable keyboard interaction
        cellEl.setAttribute('tabindex', '0');
      }
      
      // add the cell to the row
      rowEl.appendChild(cellEl);
    });

    // add the row to the table
    tableEl.appendChild(rowEl);
  });
};


/**
 * Update the turn order
 */
const nextTurn = () => {
  if (turn === null) {
    // randomize the first turn between player 0 and 1
    turn = Math.floor(Math.random() * 2);
  } else {
    // switch to player 1 from 0, and vice versa
    turn = turn === 0 ? 1 : 0;
  }

  // update the instructional text with new player
  drawText(`player ${PLAYERS[turn]}'s turn`);
};


/**
 * Add a new symbol to the grid
 *
 * @param {string} symbol - The player's symbol to add to the grid
 * @param {Array} coordinates - The location within the grid to update
 */
const addSymbol = (symbol, coordinates) => {
  if (isEmpty(coordinates)) {
    // if space is empty, add symbol to grid
    grid[coordinates[1]][coordinates[0]] = symbol;
    // redraw the resulting grid
    drawGrid();
    // check to see if the game should continue
    isOver();
  }
};


/**
 * Check to see if location within the grid is empty
 *
 * @param {Array} coordinates - The location within the grid to update
 * @return {boolean}
 */
const isEmpty = (coordinates) => {
  let symbol = grid[coordinates[1]][coordinates[0]];
  return symbol === null;
};


/**
 * Gather all the possible winning directions
 *
 * @return {Array}
 */
const getWinArrays = () => {
  let wins = [];

  // add all three rows
  for (let row of grid) {
    wins.push(row);
  }

  // add all three columns
  for (let i = 0; i < 3; i++) {
    wins.push([grid[0][i], grid[1][i], grid[2][i]]);
  }

  // add both diagonals
  wins.push([grid[0][0], grid[1][1], grid[2][2]]);
  wins.push([grid[0][2], grid[1][1], grid[2][0]]);

  return wins;
};


/**
 * Determine if the game is over or not
 */
const isOver = () => {
  // gather all the possible winning directions
  let wins = getWinArrays();

  // see if any of the possible directions has won
  let isWon = wins.some((w) => {
    // for each possible winning direction, check to see
    // if all three characters match and are not null
    return w[0] !== null && w[0] === w[1] && w[1] === w[2];
  });

  // see if every cell in the grid has been filled
  let isFull = grid.every(row => row.every(cell => cell !== null));

  if (isWon) {
    // show text that the game is over and which player won
    drawText(`player ${PLAYERS[turn]} has won!`, true);
  } else if (isFull) {
    // show text that the game is over and no one won
    drawText('stalemate.', true);
  } else {
    // keep playing
    nextTurn();
  }
};


/**
 * Draw instructional text at bottom of the screen
 *
 * @param {string} text - The text to display to the user
 * @param {boolean} [over] - The game is over
 */
const drawText = (text, over = false) => {
  // get section that should hold instructions, and clear the last instructions
  const instrEl = document.querySelector('section');
  clearElement(instrEl);

  // make a heading element and add the instructional text
  const headingEl = document.createElement('h1');
  const headingTxt = document.createTextNode(text);
  headingEl.appendChild(headingTxt);
  instrEl.appendChild(headingEl);

  if (over) {
    // if the game is over, create a button to reset the board
    const replayEl = document.createElement('button');
    const replayTxt = document.createTextNode('play again');
    replayEl.appendChild(replayTxt);
    instrEl.appendChild(replayEl);
    replayEl.addEventListener('click', init);
    replayEl.focus();
  }
};

