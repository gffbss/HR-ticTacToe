var prompt = require('readline-sync');

var TicTacToe = function() {
  this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  this.player = 'x';
  this.moves = 0;
}

TicTacToe.prototype.placeMove = function(row, col) {
  this.board[row][col] = this.player;
  this.moves++;
}

TicTacToe.prototype.switchPlayer = function() {
  this.player = this.player === 'x' ? 'o' : 'x';
}

TicTacToe.prototype.printInvalidMove = function(message) {
  console.log(`Invalid input: ${message}`);
}

TicTacToe.prototype.isInvalidMove = function(move) {
  move = Number(move);

  if(move > 9 || move < 1) {
    this.printInvalidMove('number must be between 1 and 9');
    return true;
  } else if(Math.floor(move) !== move) {
    this.printInvalidMove('number must be an integer');
    return true;
  } else if(this.isPositionOccupied(move)) {
    this.printInvalidMove('that position is already occupied');
    return true;
  } else {
    return false;
  }
}

TicTacToe.prototype.isPositionOccupied = function(move) {
  var {row, col} = this.convertToRowCol(move);
  return typeof this.board[row][col] === 'string';
}

TicTacToe.prototype.convertToRowCol = function(move) {
  var row = Math.floor((move - 1)/3);
  var col = (move - 1) % 3;
  return {row, col};
}

TicTacToe.prototype.areAllEqual = function(a, b, c) {
  return a === b && b === c;
}

TicTacToe.prototype.isRowWinner = function(row) {
  return this.areAllEqual(this.board[row][0], this.board[row][1], this.board[row][2]);
}

TicTacToe.prototype.isColWinner = function(col) {
  return this.areAllEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
}

TicTacToe.prototype.isDiagonalWinner = function() {
  return this.areAllEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.areAllEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
}

TicTacToe.prototype.isWinner = function(row, col) {
  return this.isRowWinner(row) || this.isColWinner(col) || this.isDiagonalWinner();
}

TicTacToe.prototype.isDraw = function() {
  return this.moves === 9;
}

TicTacToe.prototype.printBoard = function() {
  console.log(`${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}`);
  console.log(`${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}`);
  console.log(`${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}`);
}

TicTacToe.prototype.printWinner = function() {
  console.log(`Congratulations, ${this.player}, you've won!`);
}

TicTacToe.prototype.printDraw = function() {
  console.log('The game is a draw.');
}

TicTacToe.prototype.promptPlayerMove = function() {
  var move; 
  do {
    move = prompt.question(`Player ${this.player}, it's your turn! Please choose a move (1-9): `);
  } while(this.isInvalidMove(move));
  return this.convertToRowCol(move);
}

TicTacToe.prototype.play = function() {
  this.printBoard();
  var {row, col} = this.promptPlayerMove();
  this.placeMove(row, col);
  if(this.isWinner(row, col)) {
    this.printWinner();
  } else if(this.isDraw()) {
    this.printDraw();
  } else {
    this.switchPlayer();
    this.play();
  }
}

var game = new TicTacToe();
game.play();

