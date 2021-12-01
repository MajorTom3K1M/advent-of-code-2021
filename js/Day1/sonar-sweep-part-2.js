const fs = require("fs");
const depths = fs.readFileSync("./js/Day1/input.txt").toString().split("\r\n");

let WINDOW_SIZE = 3;
let measurement = 0;
for (let i = 0; i < depths.length - WINDOW_SIZE; i++) {
  let prevDepth = depths
    .slice(i, i + WINDOW_SIZE)
    .reduce((sum, current) => sum + Number(current), 0);
  let currDepth = depths
    .slice(i + 1, i + WINDOW_SIZE + 1)
    .reduce((sum, current) => sum + Number(current), 0);
  if (currDepth > prevDepth) {
    measurement++;
  }
}

console.log({ measurement });
