let answer1 = 0;
let answer2 = 0;
let stringsToFindArray = [];
let partsToUseArray = [];
let foundTemp = 0;

fetch("data.txt")
//fetch("data_test.txt")
  .then((response) => response.text())
  .then((textData) => {
    let temp = textData.split("\r\n");
    for (let i = 0; i < temp.length; i++) {
      if (i == 0) {
        partsToUseArray = temp[i].split(", ");
      }
      if (i > 1) {
        stringsToFindArray.push(temp[i]);
      }
    }
    console.log(partsToUseArray);
    console.log(stringsToFindArray);

    for (let i = 0; i < stringsToFindArray.length; i++) {
      console.log(i);
      solveString(stringsToFindArray[i], partsToUseArray);
    }
    console.log(answer1);
  });

function solveString(stringToCheck, partsToUse) {
  foundTemp = 0;
  checkStringStartToEnd(stringToCheck, partsToUse);
  console.log("foundTemp");
  console.log(foundTemp);
  if (foundTemp > 0) {
    answer1++;
  }
}

function findAllThePartsThatAreInString(stringToCheck, partsToUse) {
  let partsFound = [];
  for (let i = 0; i < partsToUse.length; i++) {
    if (stringToCheck.includes(partsToUse[i])) {
      partsFound.push(partsToUse[i]);
    }
  }
  return partsFound;
}

function checkStringStartToEnd(stringToCheck, partsToUse) {
  if (foundTemp > 0) {
    return;
  }
  //console.log("stringToCheck");
  //console.log(stringToCheck);
  //console.log("partsToUse");
  //console.log(partsToUse);
  partsToUse = findAllThePartsThatAreInString(
    stringToCheck,
    partsToUse
  );
  if (stringToCheck.length == 0) {
    //console.log("found");
    foundTemp++;
  }
  for (let i = 0; i < partsToUse.length; i++) {
    if (stringToCheck.startsWith(partsToUse[i])) {
      //stringToCheck = stringToCheck.replace(partsToUse[i], "");
      checkStringStartToEnd(stringToCheck.replace(partsToUse[i], ""), partsToUse);
    }
  }
}

//answer1 test_data should be 6
