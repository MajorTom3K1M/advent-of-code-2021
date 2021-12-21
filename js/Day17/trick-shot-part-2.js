const fs = require("fs");
const targetAreaText = fs
    .readFileSync("./js/Day17/input.txt")
    .toString().trim();

const targetArea = /target area: x=(?<xMin>-?\d+)..(?<xMax>-?\d+), y=(?<yMin>-?\d+)..(?<yMax>-?\d+)/g.exec(targetAreaText).groups;


const fire = ({ veloX, veloY }, targetArea) => {
    let newX = 0, newY = 0;
    let steps = []
    while (newX < targetArea.xMax && newY > targetArea.yMin) {
        if(veloX > 0) {
            newX += veloX--;
        }
        newY += veloY--;
        steps.push({ x: newX, y: newY });
        if(
            newX <= targetArea.xMax && newX >= targetArea.xMin &&
            newY <= targetArea.yMax && newY >= targetArea.yMin
        ) {
            return steps;
        }
    }
    return [];
}

let count = 0;
for(let y = targetArea.yMin; y <= Math.abs(targetArea.yMin); y++) {
    for(let x = 0; x <= targetArea.xMax; x++) {
        const steps = fire({ veloX: x, veloY: y }, targetArea);
        if(steps.length) {
            count++;
        }
    }
}
console.log({ count })