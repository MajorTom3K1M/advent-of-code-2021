const fs = require("fs");
const octopus = fs
  .readFileSync("./js/Day11/input.txt")
  .toString()
  .split("\r\n")
  .map((numbers) => numbers.split("").map(Number));

const STEPS = 100;

const incrementEnergies = (octopusGrid) => {
    let flashedPosition = [];
    for (let i = 0; i < octopusGrid.length; i++) {
        const row = octopusGrid[i];
        for(let j = 0; j < row.length; j++) {
            let value = row[j];
            if(value + 1 <= 9) {
                ++octopusGrid[i][j];
            } else {
                flashedPosition.push([i,j]);
                octopusGrid[i][j] = 0;                
            }
        }
    }
    return flashedPosition;
}

const spreadEnergies = (octopusGrid, coord) => {
    const width = octopusGrid.length;
    const height = octopusGrid[0].length;
    const [y, x] = coord
    const left = x - 1;
    const right = x + 1;
    const up = y - 1;
    const down = y + 1;
    
    let flashed = 0;
    if(left >= 0 && octopusGrid[y][left] !== 0) {
        if(++octopusGrid[y][left] > 9) {
            octopusGrid[y][left] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [y, left]);
        }
    }

    if(right < width && octopusGrid[y][right] !== 0) {
        if(++octopusGrid[y][right] > 9) {
            octopusGrid[y][right] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [y, right]);
        }
    }

    if(up >= 0 && octopusGrid[up][x] !== 0) {
        if(++octopusGrid[up][x] > 9) {
            octopusGrid[up][x] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [up, x]);
        }
    }

    if(down < height && octopusGrid[down][x] !== 0) {
        if(++octopusGrid[down][x] > 9) {
            octopusGrid[down][x] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [down, x]);
        }
    }

    if(up >= 0 && left >= 0 && octopusGrid[up][left] !== 0) {
        if(++octopusGrid[up][left] > 9) {
            octopusGrid[up][left] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [up, left]);
        }
    }

    if(up >= 0 && right < width && octopusGrid[up][right] !== 0) {
        if(++octopusGrid[up][right] > 9) {
            octopusGrid[up][right] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [up, right]);
        }
    }

    if(down < height && left >= 0 && octopusGrid[down][left] !== 0) {
        if(++octopusGrid[down][left] > 9) {
            octopusGrid[down][left] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [down, left]);
        }
    }

    if(down < height && right < width && octopusGrid[down][right] !== 0) {
        if(++octopusGrid[down][right] > 9) {
            octopusGrid[down][right] = 0;
            flashed += 1;
            flashed += spreadEnergies(octopusGrid, [down, right]);
        }
    }

    return flashed;
}

let flashedSum = 0
for(let step = 0; step < STEPS; step++) {
    let flashed = incrementEnergies(octopus);
    for(let coord of flashed) {
        flashedSum += 1;
        flashedSum += spreadEnergies(octopus, coord);
    }
}

console.log({ flashedSum })