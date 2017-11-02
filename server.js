const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

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

app.post('/move', function(req, res) {
  console.log('posted');
  console.log(req.body);
  res.send('Hello World!');
});

app.listen(3001, function() {
  console.log('listening on port 3001!');
});
