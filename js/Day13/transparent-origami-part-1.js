const fs = require("fs");
const [coordString, instructionString] = fs
  .readFileSync("./js/Day13/input.txt")
  .toString()
  .split("\r\n\r\n");

let coordinates = new Set(coordString.split("\r\n"));
let newCoord = new Set();
const instructions = instructionString.split("\r\n").map((instruction) => {
  const [ins, number] = instruction.split("=");
  return { axis: ins[ins.length - 1], number: Number(number) };
});

for (let instruction of instructions) {
  const { axis, number } = instruction;
  newCoord = new Set();
  for (let coordinate of coordinates) {
    const [x, y] = coordinate.split(",").map(Number);
    if (axis === "x") {
      if (x < number) newCoord.add(`${x},${y}`);
      else newCoord.add(`${2 * number - x},${y}`);
    } else {
      if (y < number) newCoord.add(`${x},${y}`);
      else newCoord.add(`${x},${2 * number - y}`);
    }
  }
  coordinates = newCoord;
  break;
}

console.log(coordinates.size);
