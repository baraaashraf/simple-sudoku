var numSeleted = null;
var tileSelected = null;
var initialTime = new Date();
var errors = 0;
var board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---",
];

var solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763",
];

window.onload = function () {
  setGame();
};

function setGame() {
  // Create digits 1-9
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  //Create the 9x9 board
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] === "-") {
        tile.innerText = "";
      } else {
        tile.innerText = board[r][c];
        tile.classList.add("main-tiles");
      }
      if (r === 2 || r === 5) tile.classList.add("horizontal-3x3-line");
      if (c === 2 || c === 5) tile.classList.add("vertical-3x3-line");

      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSeleted !== null) {
    numSeleted.classList.remove("number-selected");
  }
  numSeleted = this;
  numSeleted.classList.add("number-selected");
}

function selectTile() {
  if (numSeleted !== null) {
    if (this.innerText !== "") {
      return;
    }

    let sqCoords = this.id.split("-");
    let r = parseInt(sqCoords[0]);
    let c = parseInt(sqCoords[1]);

    if (solution[r][c] === numSeleted.id) {
      this.innerText = numSeleted.id;
    } else {
      errors++;
      errcount = document.getElementById("errors");
      errcount.innerText = errors;
    }
  }
}

// Show Elapsed Time
function updateClock() {
  const currentTime = new Date();
  let timeDiffernce = currentTime - initialTime;
  const hours = Math.floor(timeDiffernce / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiffernce % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiffernce % (1000 * 60)) / 1000);
  let runningTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").innerText = runningTime;
}

let elpasedTime = setInterval(updateClock, 1000);

// Stopping the Game
const giveUpButton = document.getElementById("giveup");
giveUpButton.addEventListener("click", giveUp);
function giveUp() {
  clearInterval(elpasedTime);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      if (tile.innerText === "") {
        tile.innerText = solution[r][c];
        tile.classList.add("unsolved-tiles");
      } 
    }
  }
}
