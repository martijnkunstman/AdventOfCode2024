let answer1 = 0;
let answer2 = 0;
let stones = [];
let results = [];
let foundNumbers = [];

//fetch("data.txt")
fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    console.log(textData);
    stones = textData.split(" ");
    console.log("stones:");
    console.log(stones);

   //now optimize by replaceing number 1 to 9 by a 0 ???

    console.log("answer1:");
    answer1 = calculateCountForNumberAndCycles(stones, 25);
    console.log(answer1); //198075    //55312 test

    //console.log("foundNumbers:");
    //console.log(foundNumbers);

    // ---- test ----
    stones = textData.split(" ");
    foundNumbers = [];
    console.log("stones:");
    console.log(stones);

    answer2 = calculateCountForNumberAndCyclesSET(stones, 25);
    console.log("answer2"); 
    console.log(answer2); //198075

    console.log("numbersCount:");
    console.log(numbersCount);

    console.log("stones:");
    console.log(stones);

  });

//-------------------------------------------------------


let numbersCount = [];

function calculateCountForNumberAndCyclesSET(numbers, cycles) {
  for (let i = 0; i < cycles; i++) {
    for (let j = 0; j < numbers.length; j++) {
      numbers[j] = step(numbers[j]);
    }
    //console.log("numbers:");
    //console.log(numbers);
    numbers = numbers.flat();
    //find duplicate numbers and count them, then remove them
    //numbersCount = [];
    for (let j = 0; j < numbers.length; j++) {
      if (numbersCount[numbers[j]] == undefined) {
        numbersCount[numbers[j]] = 1;
      } else {
        numbersCount[numbers[j]]++;
      }
    }
    let duplicates = [];
    for (let j = 0; j < numbers.length; j++) {
      if (numbersCount[numbers[j]] > 1) {
        duplicates.push(numbers[j]);
      }
    }
    //console.log("duplicates:");
    //console.log(duplicates);
    //numbers = numbers.filter((el) => !duplicates.includes(el));
    //console.log("numbers:");
    //console.log(numbers);

  }
  return numbers.length;
}



function calculateCountForNumberAndCycles(numbers, cycles) {
  for (let i = 0; i < cycles; i++) {
    for (let j = 0; j < numbers.length; j++) {
      numbers[j] = step(numbers[j]);
    }
    numbers = numbers.flat();
    //console.log("cycle " + i);
  }
  //console.log("numbers:");
  //console.log(numbers);
  return numbers.length;
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
