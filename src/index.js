const board = document.querySelector('#board');

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
      success: (res) => {
        console.log('success', res);



      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
};

input.addEventListener('submit', processMove);
