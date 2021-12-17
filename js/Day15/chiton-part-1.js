const fs = require("fs");
const density = fs
    .readFileSync("./js/Day15/input.txt")
    .toString()
    .split("\r\n")
    .map((density) => density.split("").map(Number));

const getNeigborsCoord = (currentCoord, width) => {
    const [x, y] = currentCoord.split(",").map(Number);
    const list = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 }
    ].filter(({ x, y }) => x >= 0 && y >= 0 && x < width && y < width);
    return list;
}

let table = {};
let queue = [];
let size = density.length; // because it square width and height are identical

for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
        table[`${j},${i}`] = { cost: Number.MAX_SAFE_INTEGER, prev: undefined };
    }
}

// Dijkstra's algorithm
table[`0,0`] = { cost: 0,  prev: undefined }
queue.push(`0,0`);
while (queue.length > 0) {
    let u = queue.shift();
    const neightbors = getNeigborsCoord(u, size);
    for(let v of neightbors) {
        let alt = table[u].cost + density[v.y][v.x];
        if(alt < table[`${v.x},${v.y}`].cost) {
            table[`${v.x},${v.y}`].cost = alt;
            table[`${v.x},${v.y}`].prev = u;
            queue.push(`${v.x},${v.y}`)
        }
    }
}

console.log({ totalRisk: table[`${size - 1},${size - 1}`].cost });

// let path = [];
// let target = `9,9`;
// while(table[target].prev) {
//     const [x, y] = table[target].prev.split(",").map(Number);
//     path.unshift(density[y][x]);
//     target = table[target].prev;
// }

// console.log({ table });
// console.log({ path });

// console.log(path.reduce((total, cur) => total + cur, 0));
