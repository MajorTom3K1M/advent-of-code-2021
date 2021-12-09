const fs = require("fs");
const informations = fs
  .readFileSync("./js/Day8/input.txt")
  .toString()
  .split(/(?<=\w)\r\n/)
  .map((value) => value.split(" | "))

const isSubset = (str1, str2) => {
    for(let i = 0; i < str1.length; i++) {
        if(!str2.includes(str1[i])) return false;
    };
    return true;
}

const diff = (diffMe, diffBy) => { 
    const re = new RegExp(diffBy.split("").join("|"), "g")
    return diffMe.replace(re, ""); 
}

const isEqual = (str1, str2) => {
    if(str1.length !== str2.length) {
        return false;
    }
    let alphabet = {};
    for(let i = 0; i < str1.length; i++) {
        if(!alphabet[str1[i]]) alphabet[str1[i]] = 0;
    };
    for(let i = 0; i < str2.length; i++) {
        if(isNaN(alphabet[str2[i]])) return false;
        alphabet[str2[i]]++;
    }
    return !Object.keys(alphabet).some((key) => alphabet[key] < 1)
}

let sum = 0;
for(let information = 0; information < informations.length; information++) {
    let valueTable = {}
    let decoded = {};
    let encoded = [];

    // analysis
    for(let input of informations[information][0].split(" ")) {
        if(input.length === 5 || input.length === 6) {
            encoded.push(input);
        } else {
            switch(input.length) {
                case 2:
                    decoded[input] = 1;
                    valueTable[1] = input;
                    break;
                case 3:
                    decoded[input] = 7;
                    valueTable[7] = input;
                    break;
                case 4:
                    decoded[input] = 4;
                    valueTable[4] = input;
                    break;
                case 7:
                    decoded[input] = 8;
                    valueTable[8] = input;
                    break;
            }
        }
    }

    for(let input of encoded) {
        if(input.length === 5) {
            if(isSubset(valueTable[1], input)) {
                decoded[input] = 3;
            } else if(isSubset(diff(valueTable[8], valueTable[4]), input)) {
                decoded[input] = 2;
            } else {
                decoded[input] = 5;
            }
        } else {
            if(isSubset(valueTable[4], input)) {
                decoded[input] = 9;
            } else if(isSubset(diff(valueTable[8], valueTable[1]), input)) {
                decoded[input] = 6;
            } else {
                decoded[input] = 0;
            }
        }
    }

    // decoded process
    let outputs = "";
    for(let output of informations[information][1].split(" ")) {
        const found = Object.keys(decoded).find((decodeKey) => isEqual(decodeKey, output));
        outputs += decoded[found];
    }

    sum += Number(outputs)
}

console.log({ sum })