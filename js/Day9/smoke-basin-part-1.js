const fs = require("fs");
const heightmap = fs
  .readFileSync("./js/Day9/input.txt")
  .toString()
  .split("\r\n")
  .map((height) => height.split("").map(Number));

let sum = 0;
for(let i = 0; i < heightmap.length; i++) {
    for(let j = 0; j < heightmap[i].length; j++) {
      if (
        i - 1 >= 0 && heightmap[i][j] >= heightmap[i - 1][j] ||
        j - 1 >= 0 && heightmap[i][j] >= heightmap[i][j - 1] ||
        i + 1 < heightmap.length && heightmap[i][j] >= heightmap[i + 1][j] ||
        j + 1 < heightmap[i].length && heightmap[i][j] >= heightmap[i][j + 1]
      ) continue; 
      
      sum += heightmap[i][j] + 1;
    }
}
console.log({ sum })
