const fs = require("fs");
const syntax = fs
  .readFileSync("./js/Day10/input.txt")
  .toString()
  .split("\r\n")

let errorScore = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};
let sum = 0;

for(let instruction = 0; instruction < syntax.length; instruction++) {
    let stack = [];
    const subsystem = syntax[instruction];
    LOOP: for(let i = 0; i < subsystem.length; i++) {
        const char = subsystem[i];
        if(['(','[','{','<'].includes(char)) {
            stack.push(char);
            continue;
        } else {
            let top = stack[stack.length - 1];
            switch(top) {
                case '(':
                    if(char === ')') stack.pop();
                    else { 
                        sum += errorScore[char];
                        break LOOP;
                    };
                    break;
                case '[':
                    if(char === ']') stack.pop();
                    else { 
                        sum += errorScore[char];
                        break LOOP;
                    };
                    break;
                case '{':
                    if(char === '}') stack.pop();
                    else { 
                        sum += errorScore[char];
                        break LOOP;
                    };
                    break;
                case '<':
                    if(char === '>') stack.pop();
                    else { 
                        sum += errorScore[char];
                        break LOOP;
                    };
                    break;
            }
        }
    }
}

console.log({ sum });