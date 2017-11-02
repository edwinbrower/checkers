const board = document.querySelector('#board');
const squares = document.querySelectorAll('.square');
const turnDisplay = document.querySelector('#turn');

const input = document.querySelector('form');

const validateInput = (moveFrom, moveTo) => {
  if (moveFrom.length !== 2 || moveTo.length !== 2) {
    return false;
  } 
  if (!isNaN(Number(moveFrom[0])) || isNaN(Number(moveFrom[1])) || !isNaN(Number(moveTo[0])) || isNaN(Number(moveTo[1]))) {
    return false;
  } 
  if (moveFrom[0] > 'H' || moveTo[0] > 'H') {
    return false;
  }
  if (moveFrom[0] < 'A' || moveTo[0] < 'A') {
    return false;
  }
  if (moveFrom[1] < '1' || moveTo[1] < '1') {
    return false;
  }
  if (moveFrom[1] > '8' || moveTo[1] > '8') {
    return false;
  }
  return true;
};

const processMove = e => {
  e.preventDefault();
  const moveFrom = e.path[0][0].value;
  const moveTo = e.path[0][1].value;
  input.reset();
  if (!validateInput(moveFrom, moveTo)) {
    window.alert(`Enter a valid input - Letter then Number - eg. A1. Your moves of '${moveFrom}' and / or '${moveTo}' did not satisfy that requirement.`);
  } else {
    console.log('valid', moveFrom, moveTo);
    $.ajax({
      url: '/move', 
      type: 'POST',
      data: {
        moveFrom: moveFrom,
        moveTo: moveTo
      },
      success: (result) => {
        let matrix = result.board;
        console.log('success', matrix);
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
            // add and remove classes on HTML to update matrix
            let current = squares[(8 * i) + j];
            if (current.classList.contains('piece')) {
              current.classList.remove('piece');
            }
            if (current.classList.contains('black')) {
              current.classList.remove('black');
            }
            if (current.classList.contains('red')) {
              current.classList.remove('red');
            }
            if (matrix[i][j] === 'r') {
              current.classList.add('piece');
              current.classList.add('red');
            }
            if (matrix[i][j] === 'b') {
              current.classList.add('piece');              
              current.classList.add('black');
            } 
          }
        }
        turnDisplay.innerHTML = result.turn ? 'Black' : 'Red';
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
};

input.addEventListener('submit', processMove);
