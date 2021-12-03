const fs = require("fs");
const binary = fs
  .readFileSync("./js/Day3/input.txt")
  .toString()
  .split("\r\n");

let bitLength = binary[0].length;

const dict = {};

for(let i = 0; i < binary.length; i++) {
    for(let position = 0; position < bitLength; position++) {
        if(!dict[position]) {
            dict[position] = { '1': 0, '0': 0 };
        }
        dict[position][binary[i][position]]++;
    }
}

let { gammaRate, epsilonRate } = Object.keys(dict).reduce((binary, position) => {
    if (dict[position][1] > dict[position][0]) {
        binary.gammaRate += Math.pow(2, (bitLength - 1) - Number(position)); 
        binary.epsilonRate += 0;
    } else {
        binary.gammaRate += 0; 
        binary.epsilonRate += Math.pow(2, (bitLength - 1) - Number(position)); ;
    }
    return binary;
}, { gammaRate: 0, epsilonRate: 0 });

console.log({ gammaRate, epsilonRate, multiply: gammaRate * epsilonRate })