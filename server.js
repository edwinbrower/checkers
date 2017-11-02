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

app.listen(3001, function() {
  console.log('listening on port 3001!');
});
