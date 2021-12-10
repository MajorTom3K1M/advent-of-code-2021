const fs = require("fs");
const heightmap = fs
  .readFileSync("./js/Day9/input.txt")
  .toString()
  .split("\r\n")
  .map((height) => height.split("").map(Number));

let basins = [];
let visited = {};
for(let i = 0; i < heightmap.length; i++) {
    for(let j = 0; j < heightmap[i].length; j++) { 
        if(!visited[`${i},${j}`]) {
            let basin = { size: 0, value: 0 };
            let stack = [];
            stack.push({ key: `${i},${j}`, row: i, col: j ,value: heightmap[i][j] });
            while (stack.length > 0) {
                const visiting = stack.pop();
                const { row, col, value } = visiting;
                if(!visited[visiting.key]) {
                    visited[visiting.key] = true;
                    if (value !== 9) {
                        if (row - 1 >= 0) stack.push({ key: `${row - 1},${col}`, row: row - 1, col, value: heightmap[row - 1][col] });
                        if (col - 1 >= 0) stack.push({ key: `${row},${col - 1}`, row, col: col - 1, value: heightmap[row][col - 1] });
                        if (row + 1 < heightmap.length) stack.push({ key: `${row + 1},${col}`, row: row + 1, col, value: heightmap[row + 1][col] });
                        if (col + 1 < heightmap[row].length) stack.push({ key: `${row},${col + 1}`, row, col: col + 1, value: heightmap[row][col + 1] });
                  
                        basin.size++;
                        basin.value += value;
                    }
                }
            }
            basins.push(basin);
            basins = basins.sort((a,b) => b.value - a.value).slice(0, 3);
        }
    }
}

const multiply = basins.reduce((total, basin) => total * basin.size, 1);
console.log({multiply});