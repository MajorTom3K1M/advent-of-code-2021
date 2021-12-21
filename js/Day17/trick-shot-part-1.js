const fs = require("fs");
const targetAreaText = fs
    .readFileSync("./js/Day17/input.txt")
    .toString().trim();

const targetArea = /target area: x=(?<xMin>-?\d+)..(?<xMax>-?\d+), y=(?<yMin>-?\d+)..(?<yMax>-?\d+)/g.exec(targetAreaText).groups;

// let velocity = '7,2';
// let [veloX,veloY] = velocity.split(",").map(Number);
const fire = ({ veloX, veloY }, targetArea) => {
    let newX = 0, newY = 0;
    let steps = []
    while (newX < targetArea.xMax && newY > targetArea.yMin) {
        if(veloX > 0) {
            newX += veloX--;
        }
        newY += veloY--;
        steps.push({ x: newX, y: newY });
    }
    return steps;
}

let max = Number.MIN_SAFE_INTEGER;
for(let y = 0; y < Math.abs(targetArea.yMin); y++) {
    for(let x = 0; x < targetArea.xMin; x++) {
        const steps = fire({ veloX: x, veloY: y }, targetArea);
        if(steps.length) {
            let stepsMax = Math.max(...steps.map(step => step.y));
            if(max < stepsMax) {
                max = stepsMax;
            }
        }
    }
}
console.log({ max })