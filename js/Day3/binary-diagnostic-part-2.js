const fs = require("fs");
const binary = fs
  .readFileSync("./js/Day3/input.txt")
  .toString()
  .split("\r\n");

  const bitLength = binary[0].length;

  let oxygenGenerator = binary;
  let CO2scrubber = binary;
  for(let position = 0; position < bitLength; position++) {
    let oxyDict = {};
    let co2Dict = {};
    if(oxygenGenerator.length > 1) {
      for(let i = 0; i < oxygenGenerator.length; i++) {
        if(!oxyDict[position]) {
          oxyDict[position] = { '1': 0, '0': 0 };
        }
        oxyDict[position][oxygenGenerator[i][position]]++;
      }

      if(oxyDict[position][1] >= oxyDict[position][0]) {
        oxygenGenerator = oxygenGenerator.filter((binary) => binary[position] === '1');
      } else {
        oxygenGenerator = oxygenGenerator.filter((binary) => binary[position] === '0');
      }
    }

    if(CO2scrubber.length > 1) {
      for(let i = 0; i < CO2scrubber.length; i++) {
        if(!co2Dict[position]) {
          co2Dict[position] = { '1': 0, '0': 0 };
        }
        co2Dict[position][CO2scrubber[i][position]]++;
      }

      if (co2Dict[position][1] >= co2Dict[position][0]) {
        CO2scrubber = CO2scrubber.filter((binary) => binary[position] === '0');
      } else {
        CO2scrubber = CO2scrubber.filter((binary) => binary[position] === '1');
      }
    }
  }

  console.log({oxygenGenerator, CO2scrubber, multiply: parseInt(oxygenGenerator[0], 2) * parseInt(CO2scrubber[0], 2) });
  