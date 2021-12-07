const fs = require("fs");
const positions = fs
  .readFileSync("./js/Day7/input.txt")
  .toString()
  .split(",")
  .map(Number);

const uniques = positions.reduce((arr, position) => {
    if(!arr.includes(position)) {
        arr.push(position)
    }
    return arr;
}, []);

let fuelUsed = {};

for(let target of uniques) {
    for(let position of positions) {
        if(!fuelUsed[target]) fuelUsed[target] = 0;
        fuelUsed[target] += Math.abs(position - target);
    }
}

const minFuel = Object.keys(fuelUsed).reduce((min, key) => { 
    if(min > fuelUsed[key]) {
        return fuelUsed[key];
    }
    return min
}, Number.MAX_VALUE)

console.log({  minFuel })

