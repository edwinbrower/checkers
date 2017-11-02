const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'src')));

const initializeBoard = () => {
  const board = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      row.push(0);
    }
    board.push(row);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      if ( (i + j) % 2) {
        board[i][j] = 'r';
      }
    }
  }
  for (let i = 5; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ( (i + j) % 2) {
        board[i][j] = 'b';
      }
    }
  }
  return board;
};

const board = initializeBoard();
let turn = true;

const colConverter = {
  'A': 0,
  'B': 1,
  'C': 2,
  'D': 3,
  'E': 4,
  'F': 5,
  'G': 6,
  'H': 7
};

app.get('/', function(req, res) {
  res.send('getting');
});

app.post('/move', function(req, res) {
  console.log('posted', req.body);
  let moveFromCol = colConverter[req.body.moveFrom[0]];
  let moveToCol = colConverter[req.body.moveTo[0]];
  let moveFromRow = Number(req.body.moveFrom[1]) - 1;
  let moveToRow = Number(req.body.moveTo[1]) - 1;
  console.log(moveFromRow, moveFromCol, moveToRow, moveToCol);
  console.log(board[moveFromRow][moveFromCol]);
  let current = turn ? 'b' : 'r';
  if (board[moveFromRow][moveFromCol] !== current) {
    console.log('your piece is not there!');
    res.send({board: board, turn: turn});
    return;
  }

  if ( !((moveToRow + moveToCol) % 2 ) ) {
    console.log('can only move to dark gray spots!');
    res.send({board: board, turn: turn});
    return;
  }
  board[moveFromRow][moveFromCol] = 0;
  board[moveToRow][moveToCol] = turn ? 'b' : 'r';
  turn = !turn;
  res.send({board: board, turn: turn});
});

app.listen(3001, function() {
  console.log('listening on port 3001!');
});
