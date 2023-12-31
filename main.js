const gameBoard = document.querySelector("#game");

let ROW = 10;
let COL = 10;
let MINE = 5;
let arr = [];
let buttonList = [];

for (let y = 0; y < COL; y++) {
  for (let x = 0; x < ROW; x++) {
    const newButton = document.createElement("button");
    buttonList[y * ROW + x] = newButton;
    buttonList[y * ROW + x].addEventListener("click", () => {
      open(x, y);
    });
    gameBoard.appendChild(newButton);
  }
}

let _MINE = MINE;
for (let y = 0; y < COL; y++) {
  for (let x = 0; x < ROW; x++) {
    arr[y * ROW + x] = false;
  }
}
while (_MINE > 0) {
  let gridX = Math.floor(Math.random() * ROW);
  let gridY = Math.floor(Math.random() * COL);
  if (arr[gridY * ROW + gridX] === false) {
    arr[gridY * ROW + gridX] = true;
    _MINE--;
  }
}

//if the button position is mine, returns -1;
//else: return sum of mines nearby the button
function check(x, y) {
  if (arr[y * ROW + x] === true) {
    return -1;
  }
  let sum = 0;
  for (let gridY = -1; gridY < 2; gridY++) {
    for (let gridX = -1; gridX < 2; gridX++) {
      if (gridX + x < 0 || gridX + x == ROW) {
        continue;
      }
      if (gridY + y < 0 || gridY + y == COL) {
        continue;
      }
      if (arr[(y + gridY) * ROW + (x + gridX)] === true) {
        sum++;
      }
    }
  }
  return sum;
}

function open(x, y) {
  const checker = printNumber(x, y);
  if (checker === "bomb") {
    for (let y = 0; y < COL; y++) {
      for (let x = 0; x < ROW; x++) {
        let temp = printNumber(x, y);
      }
    }
  } else {
    //dfs 써서 0인접 모든 칸 여는 것 구현
  }
}

function printNumber(x, y) {
  const num = check(x, y);
  if (num === -1) {
    buttonList[y * ROW + x].innerText = "💣";
    buttonList[y * ROW + x].disabled = true;
    buttonList[y * ROW + x].style.backgroundColor = "darkgrey";
    return "bomb";
  } else if (num === 0) {
    buttonList[y * ROW + x].disabled = true;
    buttonList[y * ROW + x].style.backgroundColor = "darkgrey";
    return "zero";
  } else {
    buttonList[y * ROW + x].innerText = `${num}`;
    buttonList[y * ROW + x].disabled = true;
    buttonList[y * ROW + x].style.backgroundColor = "darkgrey";
    return "num";
  }
}
