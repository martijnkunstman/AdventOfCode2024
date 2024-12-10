let answer1 = 0;
let answer2 = 0;
let stringData = [];

fetch("data.txt")
//fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    let orgiginalData = textData;
    stringData = textData.split("");
    //console.log(stringData);
    let replace = false;
    for (let i = 0; i < stringData.length; i++) {
      if (replace) {
        replace = false;
        let temp = "";
        for (let j = 0; j < Number(stringData[i]); j++) {
          temp = temp + ".";
        }
        stringData[i] = temp;
      } else {
        replace = true;
      }
    }

    stringData = stringData.join("");
    stringData = stringData.split("");
    replace = true;

    //console.log(stringData);

    let number = 0;
    for (let i = 0; i < stringData.length; i++) {
      if (stringData[i] != ".") {
        let temp = [];
        for (let j = 0; j < Number(stringData[i]); j++) {
          temp.push(number);
        }
        stringData[i] = temp;
        number++;
      } else {
        stringData[i] = ["."];
      }
    }

    //
    stringData = stringData.flat();
    let part2 = [...stringData];
    //console.log(stringData);
    //

    let lastIndex = stringData.length - 1;
    for (let i = 0; i < stringData.length; i++) {
      if (stringData[i] == "." && i < lastIndex) {
        let found = false;
        do {
          if (stringData[lastIndex] == ".") {
            lastIndex--;
          } else {
            stringData[i] = stringData[lastIndex];
            stringData[lastIndex] = ".";
            lastIndex--;
            found = true;
          }
        } while (!found);
      }
    }
    //console.log(stringData);
    //
    for (let i = 0; i < stringData.length; i++) {
      if (stringData[i] == ".") {
        break;
      } else {
        answer1 = answer1 + i * stringData[i];
      }
    }
    console.log(answer1);
    //part2

    let lengthArray = [];
    putInArray = true;
    //console.log("orgiginalData:");
    //console.log(orgiginalData);
    for (let i = 0; i < orgiginalData.length; i++) {
      if (putInArray) {
        putInArray = false;
        lengthArray.push(Number(orgiginalData[i]));
      } else {
        putInArray = true;
      }
    }
    //console.log("lengthArray (=length of numbers to put into points):");
    //console.log(lengthArray);

    //find the first place where we can put the numbers

    for (let i = 0; i < lengthArray.length; i++) {
      let numberToPut = lengthArray.length - 1 - i;
      let numberToPutLength = lengthArray[lengthArray.length - 1 - i];
      //console.log("numberToPut:");
      //console.log(numberToPut);
      //console.log("numberToPutLength:");
      //console.log(numberToPutLength);
      //find the first place where there are numberTopuLength points
      let pointsFound = 0;
      let enoughPointsFound = false;
      let indexToPlaceNumber = 0;
      for (let j = 0; j < part2.length; j++) {
        if (part2[j] == ".") {
          pointsFound++;
        } else {
          pointsFound = 0;
        }
        if (pointsFound == numberToPutLength) {
          enoughPointsFound = true;
          indexToPlaceNumber = j - pointsFound + 1;
          break;
        }
      }
      //--------
      if (enoughPointsFound) {
        //never place forwards.....
        let forward = false;

        //removenumberToPutFromPart2;
        for (let j = 0; j < part2.length; j++) {
          if (part2[j] == numberToPut) {
            if (j > indexToPlaceNumber) {
              part2[j] = ".";
            } else {
              forward = true;
            }
          }
        }
        //put numberToPut at placeofpoints
        if (!forward) {
          for (let j = 0; j < numberToPutLength; j++) {
            part2[indexToPlaceNumber + j] = numberToPut;
          }
        } else {
          //skip
        }
      }
      //console.log(part2.join(""));
    }
    for (let i = 0; i < part2.length; i++) {
      if (part2[i] == ".") {
        //
      } else {
        answer2 = answer2 + i * part2[i];
      }
    }
    //console.log(part2);
    console.log(answer2);
  });
