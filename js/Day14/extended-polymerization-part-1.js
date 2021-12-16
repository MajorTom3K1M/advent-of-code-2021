const fs = require("fs");
let [template,ruleString] = fs
  .readFileSync("./js/Day14/input.txt")
  .toString()
  .split("\r\n\r\n");
const rules = Object.fromEntries(ruleString.split("\r\n").map((rule) => rule.split(" -> ")));
const STEPS = 10;
let count = {};
let newTemplate;

for(let step = 0; step < STEPS; step++) {
    newTemplate = template[0];
    count = { [template[0]]: 1 };
    for(let i = 0; i < template.length - 1; i++) {
        newTemplate += rules[template.substring(i, i + 2)] + template[i + 1];
        if(!count[template[i + 1]]) count[template[i + 1]] = 0;
        if(!count[rules[template.substring(i, i + 2)]]) count[rules[template.substring(i, i + 2)]] = 0;
        count[template[i + 1]]++;
        count[rules[template.substring(i, i + 2)]]++;
    }
    template = newTemplate;
}

let { max, min } = Object.keys(count).reduce((obj, current) => {
    if(obj.max < count[current]) obj.max = count[current];
    if(obj.min > count[current]) obj.min = count[current];
    return obj;
}, { max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER });


console.log(max - min);