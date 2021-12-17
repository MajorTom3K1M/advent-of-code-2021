const fs = require("fs");
const density = fs
    .readFileSync("./js/Day15/input.txt")
    .toString()
    .split("\r\n")
    .map((density) => density.split("").map(Number));

const SCALE_TIME = 5;
const SIZE = density.length;
const SCALE_SIZE = SCALE_TIME * SIZE;

const largerDensity = Array.from(Array(SCALE_SIZE), (_, i) => {
    return Array.from(Array(SCALE_SIZE), (_, j) => {
        const value = density[i % SIZE][j % SIZE] + Math.floor(j/SIZE) + Math.floor(i/SIZE);
        return value > 9 ? value - 9 : value;
    })
});

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

for(let i = 0; i < SCALE_SIZE; i++) {
    for(let j = 0; j < SCALE_SIZE; j++) {
        table[`${j},${i}`] = { cost: Number.MAX_SAFE_INTEGER, prev: undefined };
    }
}
table[`0,0`] = { cost: 0,  prev: undefined }

// Dijkstra's algorithm
// for part 2 it around 9 seccond which is slow
queue.push(`0,0`);
while (queue.length > 0) {
    let u = queue.shift();
    const neightbors = getNeigborsCoord(u, SCALE_SIZE);
    for(let v of neightbors) {
        let alt = table[u].cost + largerDensity[v.y][v.x];
        if(alt < table[`${v.x},${v.y}`].cost) {
            table[`${v.x},${v.y}`].cost = alt;
            table[`${v.x},${v.y}`].prev = u;
            queue.push(`${v.x},${v.y}`)
        }
    }
}

console.log({ totalRisk: table[`${SCALE_SIZE - 1},${SCALE_SIZE - 1}`].cost });