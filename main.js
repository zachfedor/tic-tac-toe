/***************
 * Tic Tac Toe *
 ***************/

const PLAYERS = ['X', 'O'];
let grid = [];
let turn = null;

/**
 * Onload, set up the game
 */
const init = () => {
  resetGrid();
  drawGrid(grid);
  nextTurn();
};
window.onload = init;

/**
 * Clear an element of all its children
 */
const clearElement = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

/**
 * Function to draw the board
 */
const drawGrid = (grid) => {
  const tableEl = document.querySelector('table');
  // destroy table to redraw it later
  clearElement(tableEl);

  grid.forEach((row, coordY) => {
    const rowEl = document.createElement('tr');

    row.forEach((cell, coordX) => {
      const cellCoords = [coordX, coordY];
      const cellEl = document.createElement('td');

      const cellText = document.createTextNode(cell || '\u00A0');
      cellEl.appendChild(cellText);

      if (cell === null) {
        cellEl.addEventListener('click', () => addSymbol(PLAYERS[turn], cellCoords));
        cellEl.addEventListener('keyup', (event) => {
          if (event.key === "Enter") {
            addSymbol(PLAYERS[turn], cellCoords);
          }
        });
        cellEl.className = 'empty';
        cellEl.setAttribute('tabindex', '0');
      }
      
      rowEl.appendChild(cellEl);
    });

    tableEl.appendChild(rowEl);
  });
};

/**
 * Function to track turn order
 */
const nextTurn = () => {
  if (turn === null) {
    // randomize the first turn
    turn = Math.floor(Math.random() * 2);
  } else {
    // switch players
    turn = turn === 0 ? 1 : 0;
  }
  drawText(`Player ${PLAYERS[turn]}'s turn`);
};

/**
 * Function to reset grid
 */
const resetGrid = () => {
  grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
};

/**
 * Function to add a new symbol
 */
const addSymbol = (symbol, coordinates) => {
  if (isEmpty(coordinates)) {
    // if space is empty, add symbol to grid
    grid[coordinates[1]][coordinates[0]] = symbol;
    // redraw grid
    drawGrid(grid);
    // is over?
    isOver(grid);
  }
};

/**
 * Function to check if square is empty
 */
const isEmpty = (coordinates) => {
  let symbol = grid[coordinates[1]][coordinates[0]];
  return symbol === null;
};

/**
 * Function to build win arrays
 */
const getWinArrays = (grid) => {
  let wins = [];

  // check rows
  for (let row of grid) {
    wins.push(row);
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    wins.push([grid[0][i], grid[1][i], grid[2][i]]);
  }

  // check diagonals
  wins.push([grid[0][0], grid[1][1], grid[2][2]]);
  wins.push([grid[0][2], grid[1][1], grid[2][0]]);

  return wins;
};

/**
 * Function to check for a winner
 */
const isOver = (grid) => {
  let wins = getWinArrays(grid);

  let isWon = wins.some((w) => {
    return w[0] !== null && w[0] === w[1] && w[1] === w[2];
  });

  let isFull = grid.every((row) => {
    return row.every(cell => cell !== null);
  });

  if (isWon) {
    drawText(`Player ${PLAYERS[turn]} has won!`, true);
  } else if (isFull) {
    drawText('Stalemate...', true);
  } else {
    nextTurn();
  }
};

/**
 * Draw text
 */
const drawText = (text, over = false) => {
  const resultsEl = document.querySelector('section');
  clearElement(resultsEl);

  const headingEl = document.createElement('h1');
  const headingTxt = document.createTextNode(text);
  headingEl.appendChild(headingTxt);
  resultsEl.appendChild(headingEl);

  if (over) {
    const replayEl = document.createElement('button');
    const replayTxt = document.createTextNode('Play Again');
    replayEl.appendChild(replayTxt);
    resultsEl.appendChild(replayEl);
    replayEl.addEventListener('click', init);
  }
};

