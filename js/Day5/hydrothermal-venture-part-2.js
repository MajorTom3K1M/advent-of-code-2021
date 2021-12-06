const fs = require("fs");
const lines = fs
  .readFileSync("./js/Day5/input.txt")
  .toString()
  .split("\r\n")
  .map((line) => /(?<x1>\d+)\s*,(?<y1>\d+)\s*->\s*(?<x2>\d+)\s*,(?<y2>\d+)/g.exec(line).groups);

let count = {};
for(let i = 0; i < lines.length; i++) {
    const { x1, y1, x2, y2 } = lines[i]; 
    if (y1 === y2) {
        let start = Math.min(Number(x1), Number(x2));
        let end = Math.max(Number(x1), Number(x2));
        for(let x = start; x <= end; x++) {
            if(!count[`${x},${y1}`]) count[`${x},${y1}`] = 0;
            count[`${x},${y1}`]++;
        }
    } else if (x1 === x2) {
        let start = Math.min(Number(y1), Number(y2));
        let end = Math.max(Number(y1), Number(y2));
        for(let y = start; y <= end; y++) {
            if(!count[`${x1},${y}`]) count[`${x1},${y}`] = 0;
            count[`${x1},${y}`]++;
        }
    } else if (Number(x1) > Number(x2) && Number(y1) < Number(y2) || Number(x1) < Number(x2) && Number(y1) > Number(y2)) {
        let xStart = Math.min(Number(x1), Number(x2));
        let xEnd = Math.max(Number(x1), Number(x2));
        let yStart = Math.max(Number(y1), Number(y2));
        let yEnd = Math.min(Number(y1), Number(y2));
        for(let x = xStart, y = yStart; x <= xEnd && y >= yEnd; x++, y--) {
            if(!count[`${x},${y}`]) count[`${x},${y}`] = 0;
            count[`${x},${y}`]++;
        }
    } else if (Number(x1) < Number(x2) && Number(y1) < Number(y2) || Number(x1) > Number(x2) && Number(y1) > Number(y2)) {
        let xStart = Math.min(Number(x1), Number(x2));
        let xEnd = Math.max(Number(x1), Number(x2));
        let yStart = Math.min(Number(y1), Number(y2));
        let yEnd = Math.max(Number(y1), Number(y2));
        for(let x = xStart, y = yStart; x <= xEnd && y <= yEnd; x++, y++) {
            if(!count[`${x},${y}`]) count[`${x},${y}`] = 0;
            count[`${x},${y}`]++;
        }
    }
}

const countOverlap = Object.keys(count).reduce((total, current) => count[current] > 1 ? (total + 1) : (total), 0);

console.log({ countOverlap });