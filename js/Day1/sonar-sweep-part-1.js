const fs = require("fs");
const depths = fs.readFileSync("./js/Day1/input.txt").toString().split("\r\n");

let measurement = 0;
for (let i = 1; i < depths.length; i++) {
  if (Number(depths[i]) > Number(depths[i - 1])) {
    measurement++;
  }
}
console.log({ measurement });
