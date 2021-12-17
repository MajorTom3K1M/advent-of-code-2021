const fs = require("fs");
let [templateString,ruleString] = fs
  .readFileSync("./js/Day14/input.txt")
  .toString()
  .split("\r\n\r\n");
const STEPS = 40;

const rules = Object.fromEntries(
    ruleString.split("\r\n")
        .map((rule) => rule.split(" -> "))
        .map((entry) => [
            entry[0], [entry[0][0] + entry[1], entry[1] + entry[0][1]]
        ])
);

let count = {};
let template = {};
let newTemplate = {};
for(let i = 0; i < templateString.length - 1; i++) {
    if(!template[templateString[i] + templateString[i + 1]]) template[templateString[i] + templateString[i + 1]] = 0;
    template[templateString[i] + templateString[i + 1]]++;
}

for(let step = 0; step < STEPS; step++) {
    newTemplate = {};
    count = { [templateString[0]]: 1 };
    const keys = Object.keys(template);
    for(let i = 0; i < keys.length; i++) {
        for(let k = 0; k < rules[keys[i]].length; k++) {
            if(!newTemplate[rules[keys[i]][k]]) newTemplate[rules[keys[i]][k]] = 0;
            newTemplate[rules[keys[i]][k]] += template[keys[i]];
    
            if(!count[rules[keys[i]][k][1]]) count[rules[keys[i]][k][1]] = 0;
            count[rules[keys[i]][k][1]] += template[keys[i]];
        }
    }
    template = newTemplate;
}

// console.log({ count });

let max = Math.max(...Object.values(count));
let min = Math.min(...Object.values(count));

console.log(max - min);
