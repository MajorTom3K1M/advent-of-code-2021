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
queue.push({ path: ['start'], isSmallTwice: false });
while (queue.length > 0) {
    let v = queue.shift();
    LOOP: for(let adjacent of map[v.path[v.path.length - 1]]) {
        if(adjacent !== 'start') {
            if(adjacent === 'end') {
                count++;
                path.push(v.path.concat(adjacent));
                continue LOOP;
            }
            if(adjacent === adjacent.toLowerCase()) {
                const isHasVisited = v.path.includes(adjacent);
                if(v.isSmallTwice && isHasVisited) continue LOOP;
            }

            let temp = {};
            let newQ = {
                path: v.path.concat(adjacent),
                isSmallTwice: v.path.concat(adjacent).some((id) => {
                    if(id === id.toLowerCase()) {
                        if(!temp[id]) temp[id] = 0;
                        temp[id]++;
                        return temp[id] >= 2; 
                    }
                })
            };

            queue.push(newQ);
        }
    }
}

console.log({ count });