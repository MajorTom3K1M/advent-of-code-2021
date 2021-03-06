const fs = require("fs");
const positions = fs
  .readFileSync("./js/Day7/input.txt")
  .toString()
  .split(",")
  .map(Number);

const MAX_POSITION = Math.max(...positions);

let fuelUsed = {};
let minFuel = Number.MAX_SAFE_INTEGER;

for (let target = 0; target < MAX_POSITION; target++) {
  for (let position of positions) {
    if (!fuelUsed[target]) fuelUsed[target] = 0;
    fuelUsed[target] += Math.abs(position - target);
  }

  if (minFuel > fuelUsed[target]) minFuel = fuelUsed[target];
}

console.log({ minFuel });
