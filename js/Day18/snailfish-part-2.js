const fs = require("fs");
const snailfish = fs
    .readFileSync("./js/Day18/input.txt")
    .toString()
    .split("\r\n")
    .map(JSON.parse);

const pairToDepth = (value, depth = 0) => typeof value === "number" ? [{ value, depth }] : value.flatMap(x => pairToDepth(x, depth + 1));

const depthToPair = (values, state = {pos: 0}, depth = 0) => values[state.pos].depth > depth ? 
        [depthToPair(values, state, depth + 1), depthToPair(values, state, depth + 1)] :
        values[state.pos++].value;

const doExplode = (values) => {
    let i = values.findIndex(({depth}) => depth > 4);
    if(i < 0) return false;
    if(i > 0) values[i - 1].value += values[i].value;
    if(i < values.length - 2)  values[i + 2].value += values[i + 1].value;
    values.splice(i, 2, { value: 0, depth: values[i].depth - 1 });
    return true;
}

const doSplit = (values) => {
    let i = values.findIndex(({value}) => value >= 10);
    if(i < 0) return false;
    values.splice(i, 1, { 
        value: Math.floor(values[i].value / 2), 
        depth: values[i].depth + 1 
    }, { 
        value: Math.ceil(values[i].value / 2), 
        depth: values[i].depth + 1 
    });
    return true;
}

const add = (depth1, depth2) => {
    let values = pairToDepth([depth1, depth2]);
    while(doExplode(values) || doSplit(values));
    return depthToPair(values);
}

const magnitude = (value) => {
    return typeof value === "number" ? value : 3 * magnitude(value[0]) + 2 * magnitude(value[1])
}

let max = Number.MIN_SAFE_INTEGER;
for(let i = 0; i < snailfish.length; i++) {
    for(let j = 0; j < snailfish.length; j++) {
        if(i === j) continue;
        let mag = magnitude(add(snailfish[i], snailfish[j]));
        if(max < mag) max = mag;
    } 
}

console.log({ max })
