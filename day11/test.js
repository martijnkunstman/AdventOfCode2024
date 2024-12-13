let start = [2701, 64945, 0, 9959979, 93, 781524, 620, 1];
let namedArray = {
  n2701: 1,
  n64945: 1,
  n0: 1,
  n9959979: 1,
  n93: 1,
  n781524: 1,
  n620: 1,
  n1: 1,
};
let numbersCount = [];
let foundNumbers = [];

//namedArray = { n125: 1, n17: 1 };
currentTime = performance.timeOrigin + performance.now();
calculateCountForNumberAndCycles(namedArray, 75);
duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);


function calculateCountForNumberAndCycles(namedArray, cycles) {
  for (let i = 0; i < cycles; i++) {
    var keys = Object.keys(namedArray);
    var newArray = {};
    for (let j = 0; j < keys.length; j++) {
      let number = keys[j].slice(1);
      let count = namedArray[keys[j]];
      let result = step(number);

      if (Array.isArray(result)) {
        if (newArray["n" + result[0]] == undefined) {
          newArray["n" + result[0]] = count;
        } else {
          newArray["n" + result[0]] += count;
        }
        if (newArray["n" + result[1]] == undefined) {
          newArray["n" + result[1]] = count;
        } else {
          newArray["n" + result[1]] += count;
        }
      } else {
        if (newArray["n" + result] == undefined) {
          newArray["n" + result] = count;
        } else {
          newArray["n" + result] += count;
        }
      }
    }
    namedArray = { ...newArray };
    console.log("Cycle " + i + " done");
  }
  keys = Object.keys(namedArray);
  let sum = 0;
  for (let j = 0; j < keys.length; j++) {
    let number = namedArray[keys[j]];
    sum += parseInt(number);
  }
  console.log(sum);
  return sum;
}

//-------------------------------------------------------

function step(input) {
  let index = input;
  if (foundNumbers[index] != undefined) {
    return foundNumbers[index];
  }
  if (input == "0") {
    //rule 1
    input = "1";
  } else if (input.toString().length % 2 == 0) {
    //rule 2
    const partOne = input.toString().slice(0, input.toString().length / 2);
    let partTwo = input
      .toString()
      .slice(input.toString().length / 2, input.toString().length);
    while (partTwo.split("")[0] == 0) {
      partTwo = partTwo.split("").slice(1, partTwo.length).join("");
    }
    if (partTwo == "") {
      partTwo = "0";
    }
    input = [partOne, partTwo];
  } else {
    //rule 3
    let bigNumber = BigInt(input);
    bigNumber = bigNumber * 2024n;
    input = bigNumber.toString();
  }
  foundNumbers[index] = input;
  return input;
}
