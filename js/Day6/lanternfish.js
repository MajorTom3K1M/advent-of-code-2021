const fs = require("fs");
const lifeCyle = fs
  .readFileSync("./js/Day6/input.txt")
  .toString()
  .split(",")
  .map(Number);

// const DAYS = 80;
const DAYS = 256;

let fishes = Object.fromEntries(Array.from(Array(10), (_, index) => [index - 1,0]));
for (let i = 0; i < lifeCyle.length; i++) {
    fishes[lifeCyle[i]]++;
}

for(let day = 0; day < DAYS; day++) {
    let length =  Object.keys(fishes).length;
    for(let i = 0; i < length; i++) {
        let temp = fishes[i] || 0;
        fishes[i - 1] = temp;
    }
    if(fishes[-1] > 0) {
        fishes[8] += fishes[-1];
        fishes[6] += fishes[-1];
        fishes[-1] = 0;
    }
}

const total = Object.keys(fishes).reduce((total, fishTime) => total + fishes[fishTime], 0);

console.log({ total })