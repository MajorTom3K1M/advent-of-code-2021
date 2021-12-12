const fs = require("fs");
const syntax = fs
  .readFileSync("./js/Day10/input.txt")
  .toString()
  .split("\r\n")

let invertedSymbolScore = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
}
let listScore = [];

for(let i = 0; i < syntax.length; i++) {
    let stack = [];
    let err = false;
    const line = syntax[i];
    LOOP: for(let j = 0; j < line.length; j++) {
        const char = line[j];
        if(['(','[','{','<'].includes(char)) {
            stack.push(char);
            continue;
        } else {
            let top = stack[stack.length - 1];
            switch(top) {
                case '(':
                    if(char === ')') stack.pop(); 
                    else { err = true; break LOOP; };
                    break;
                case '[':
                    if(char === ']') stack.pop(); 
                    else { err = true; break LOOP; };
                    break;
                case '{':
                    if(char === '}') stack.pop();
                    else { err = true; break LOOP; };
                    break;
                case '<':
                    if(char === '>') stack.pop(); 
                    else { err = true; break LOOP; };
                    break;
            }
        }
    }

    if(!err) {
        const score = stack.reverse().reduce((total, symbol) => total * 5 + invertedSymbolScore[symbol], 0);
        listScore.push(score);
    }
}

console.log({ score: (listScore.sort((a,b) => b - a))[Math.round(listScore.length / 2) - 1] })