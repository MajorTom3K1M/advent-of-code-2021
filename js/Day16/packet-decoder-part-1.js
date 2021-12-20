const fs = require("fs");
const heximal = fs
    .readFileSync("./js/Day16/input.txt", { encoding: "utf-8" })
    .trim();

const hex2bin = (hex) => {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

let bin = heximal.match(/(.{2})/g).reduce((binStr, current) => 
    binStr += hex2bin(current)
, "")

let input = bin;

const decode = (input, totalSubPackets = -1) => {
    if(parseInt(input, 2) === 0) {
        return 0;
    }
    const version = parseInt(input.substring(0, 3), 2);
    const type = parseInt(input.substring(3, 6), 2);

    let sum = version;
    if(type !== 4) {
        const legthTypeID = input.substring(6,7);
        if(legthTypeID === '0') {
            const length = parseInt(input.substring(7, 22), 2);
            sum += decode(input.substring(22));
        } else {
            const nOfSubPackets = parseInt(input.substring(7, 18), 2);
            sum += decode(input.substring(18));
        }
    } else {
        let count = 1;
        let bits = 5;
        let value = input.substring(6, 11);
        while(value[0] !== '0') {
            value = input.substring(6 + bits * count, 11 + bits * count);
            count++;
        }

        if(input.substring(11 + bits * (count - 1)).length) {
            sum += decode(input.substring(11 + bits * (count - 1)));
        }
    }
    return sum;
}

console.log(decode(input))