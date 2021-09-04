module.exports = function solveSudoku(matrix) {
  var squareCoordinates = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
]

  let updated = true,
      solved = false,
      board = matrix.slice()

  while (updated && !solved) {
      updated = oneValueConstraint(board);
      solved = isSolved(board);
  }

  if (!solved) {
      board = backtrackBased(board)
      solved = isSolved(board)
  }




function getRow(board, row) {
    return board[row];
}

function getColumn(board, column) {
    var col = [];
    for (let row = 0; row < 9; row++) {
        col.push(board[row][column]);
    }
    return col;
}

function getSquare(board, square) {
    let cells = [];
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (square === squareCoordinates[row][column]) {
                cells.push(board[row][column]);
            }
        }
    }
    return cells;
}

function completeCell(board, row, column) {
  let used = [...getRow(board, row), ...getColumn(board, column), ...getSquare(board, squareCoordinates[row][column])];
  let possibilities = [];

  for (let i = 1; i <= 9; i++) {
      if (!used.includes(i)) {
          possibilities.push(i);
      }
  }

  if (possibilities.length === 1) {
      board[row][column] = possibilities[0];
      return true;
  } else {
      board[row][column] = possibilities;
      return false;
  }
}

function appearsOnce(board, possibilities, segment, row, column) {
  let updated = false;
  for (i = 0; i < possibilities.length; i++) {
      let possibility = possibilities[i];
      let counter = 0;
      segment.forEach(cell => {
          if (Array.isArray(cell)) {
              if (cell.includes(possibility)) {
                  counter++;
              }
          } else {
              if (cell === possibility) {
                  counter++;
              }
          }
      })
      if (counter === 1) {
          board[row][column] = possibility;
          updated = true;
          break;
      }
  }
  return updated;
}

function compare(expected, actual) {
  let array1 = expected.slice();
  let array2 = actual.slice();
  return array1.length === array2.length && array1.sort().every(function (value, index) { return value === array2.sort()[index] });
}

function isSolved(board) {
  let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let valid = true;
 
  for (row = 0; row < 9 && valid == true; row++) {
      if (!compare(expected, getRow(board, row))) {
          valid = false;
      }
  }
  
  for (column = 0; column < 9 && valid == true; column++) {
      if (!compare(expected, getColumn(board, column))) {
          valid = false;
      }
  }
  
  for (square = 1; square < 9 && valid == true; square++) {
      if (!compare(expected, getSquare(board, square))) {
          valid = false;
      }
  }
  return valid;
}

function backtrackBased(orignBoard) {

  let board = JSON.parse(JSON.stringify(orignBoard));

  for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
          
          if (board[row][column] == 0) {
              completeCell(board, row, column);
              if (isSolved(board)) return board;
              let cell = board[row][column];
              
              if (Array.isArray(cell)) {
                  for (let i = 0; i < cell.length; i++) {
                      
                      let board2 = JSON.parse(JSON.stringify(board));
                      
                      board2[row][column] = cell[i];
                      
                      if (completed_board = backtrackBased(board2)) {
                          return completed_board;
                      }
                  }
                  return false;
              }
          }
      }
  }
  return false;
}

function oneValueConstraint(board) {
  updated = false;

  for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
          if (board[row][column] === 0) {
              updated = completeCell(board, row, column) || updated;
          }
      }
  }

  for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
          if (Array.isArray(board[row][column])) {
              let possibilities = board[row][column];
              updated = appearsOnce(board, possibilities, getRow(board, row), row, column) ||
              appearsOnce(board, possibilities, getColumn(board, column), row, column) ||
              appearsOnce(board, possibilities, getSquare(board, squareCoordinates[row][column]), row, column) || 
              updated;
          }
      }
  }

  for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
          if (Array.isArray(board[row][column])) {
              board[row][column] = 0;
          }
      }
  }

  return updated
}
  return board;
}
