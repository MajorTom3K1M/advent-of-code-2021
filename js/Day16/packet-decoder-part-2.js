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

const getLiteralValue = (input, currentIndex) => {
    let incrementer = 5;
    let value = input.substring(currentIndex, currentIndex + 5);
    let binary = value.substring(1);
    while(value[0] !== '0') {
        value = input.substring(currentIndex + incrementer, currentIndex + 5 + incrementer);
        binary += value.substring(1);
        incrementer += 5;
    }
    return { value: parseInt(binary, 2), currentIndex: currentIndex + incrementer };
}

const getSubPacketsByLength = (input, currentIndex) => {
    const length = parseInt(input.substring(currentIndex, currentIndex + 15), 2);
    let packets = [];
    let usedLength = 0;
    currentIndex += 15;
    while(usedLength < length) {   
        let { value, currentIndex: index } = decode(input, currentIndex);
        usedLength += index - currentIndex;
        currentIndex = index;
        packets.push(value);
    }
    return { packets, currentIndex };  
}

const getSubPacketsByNumber = (input, currentIndex) => {
    const nOfSubPackets = parseInt(input.substring(currentIndex, currentIndex + 11), 2);
    let packets = [];
    let totalPackets = 0;
    currentIndex += 11;
    while(totalPackets < nOfSubPackets) {
        let { value, currentIndex: index } = decode(input, currentIndex);
        currentIndex = index;
        totalPackets++;
        packets.push(value);
    }
    return { packets, currentIndex };  
};

const decode = (input, index = 0) => {
    if(parseInt(input.substring(index), 2) === 0) {
        return;
    }
    const version = parseInt(input.substring(index, index + 3), 2);
    const type = parseInt(input.substring(index + 3, index + 6), 2);
    index += 6;

    if(type === 4) {
        let { value, currentIndex } = getLiteralValue(input, index);
        return { value, currentIndex };
    } else {
        const legthTypeID = input.substring(index,index + 1);
        index += 1;
        if(legthTypeID === '0') {   
           var { packets, currentIndex } = getSubPacketsByLength(input, index);
        } else {
           var { packets, currentIndex } = getSubPacketsByNumber(input, index);
        }
        if (type === 0) {
            return { value: packets.reduce((a,b) => a + b, 0), currentIndex };
        } else if (type === 1) {
            return { value: packets.reduce((a,b) => a * b, 1), currentIndex };
        } else if (type === 2) {
            return { value: Math.min(...packets), currentIndex };
        } else if (type === 3) {
            return { value: Math.max(...packets), currentIndex };
        } else if (type === 5) {
            return { value: packets[0] > packets[1] ? 1 : 0 , currentIndex };
        } else if (type === 6) {
            return { value: packets[0] < packets[1] ? 1 : 0 , currentIndex };
        } else if (type === 7) {
            return { value: packets[0] === packets[1] ? 1 : 0 , currentIndex };
        }
    }
}

console.log(decode(input));