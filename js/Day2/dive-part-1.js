const fs = require("fs");
const instructions = fs
  .readFileSync("./js/Day2/input.txt")
  .toString()
  .split("\r\n");

const reader = (instruction) => {
  const { groups } =
    /(?<cmd>forward|down|up)\s*(?<number>\+{0,1}\-{0,1}\d+)/g.exec(instruction);
  return { cmd: groups.cmd, number: Number(groups.number) };
};

let horizontal = 0;
let vertical = 0;
for (let i = 0; i < instructions.length; i++) {
  const { cmd, number } = reader(instructions[i]);
  switch (cmd) {
    case "forward":
      horizontal += number;
      break;
    case "down":
      vertical += number;
      break;
    case "up":
      vertical -= number;
      break;
  }
}

console.log({ horizontal, vertical, multiply: horizontal * vertical });
