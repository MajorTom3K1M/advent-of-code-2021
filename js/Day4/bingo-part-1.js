const fs = require("fs");
const boards = fs
  .readFileSync("./js/Day4/input.txt")
  .toString()
  .split("\r\n\r\n")
  .map((string) => string.split(/\r\n|,|\s+/g).filter(String));


// 5 x 5 board!
const BOARD_SIZE = 5;

const drawnSequence = boards.splice(0,1)[0];
let count = {};
let winnerIndex = -1;
let lastNumber = 0;
DRAWN: for(let number of drawnSequence) {
  for(let boardNo = 0; boardNo < boards.length; boardNo++) {
    const numberIndex = boards[boardNo].findIndex(((num) => num === number));
    if(!count[boardNo]) count[boardNo] = new Array(5 * 5).fill(0);
    if(numberIndex >= 0) count[boardNo][numberIndex] = 1;
    
    // check horizontal
    let horizontal = 0;
    for(let i = 0; i < count[boardNo].length; i++) {
        if(i % BOARD_SIZE === 0) horizontal = 0;
        
        horizontal += count[boardNo][i]

        if(horizontal === BOARD_SIZE) { 
          winnerIndex = boardNo;
          lastNumber = number;
          break DRAWN; 
        }
    }

    // check vertical
    let vertical = 0;
    for(let i = 0; i < count[boardNo].length; i++) {
      if(i % BOARD_SIZE === 0) vertical = 0;

      vertical += count[boardNo][(i % BOARD_SIZE) * BOARD_SIZE + Math.floor(i / BOARD_SIZE)];

      if(vertical === BOARD_SIZE) { 
        winnerIndex = boardNo;
        lastNumber = number;
        break DRAWN; 
      }
    }
  }
}

const sum = boards[winnerIndex].reduce((total, current, index) => {
  if(count[winnerIndex][index] === 0) return total + Number(current);
  return total;
}, 0);

console.log({ multiply: sum * Number(lastNumber) });