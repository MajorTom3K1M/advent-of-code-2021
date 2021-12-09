const fs = require("fs");
const informations = fs
  .readFileSync("./js/Day8/input.txt")
  .toString()
  .split(/(?<=\w)\r\n/)
  .map((value) => value.split("|"))

let count = 0;
for(let information = 0; information < informations.length; information++) {
    count += informations[information][1].split(" ").reduce((total, output) => {
        switch(output.length) {
            case 2:
            case 3:
            case 4:
            case 7:
                return total + 1;
        }
        return total;
    }, 0)
}

console.log({ count })