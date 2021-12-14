const fs = require("fs");
const mapOfCave = fs.readFileSync("./js/Day12/input.txt")
    .toString()
    .split("\r\n");

const createGraph = (mapOfCave) => {
    const map = {};
    for(let path of mapOfCave) {
        const [parent, child] = path.split("-");
        if(!map[parent]) map[parent] = [];
        map[parent].push(child);
        if(!map[child]) map[child] = [];
        map[child].push(parent);
    }
    return map;
}

const map = createGraph(mapOfCave);

let path = [];
let queue = [];
let count = 0;
queue.push(['start']);
while (queue.length > 0) {
    let v = queue.shift();
    LOOP: for(let adjacent of map[v[v.length - 1]]) {
        if(adjacent !== 'start') {
            if(adjacent === 'end') {
                count++;
                path.push(v.concat(adjacent));
                continue LOOP;
            }
            
            if(adjacent === adjacent.toLowerCase() && v.includes(adjacent)) {
                continue LOOP;
            }
            queue.push(v.concat(adjacent));
        }
    }
}

console.log({ count })