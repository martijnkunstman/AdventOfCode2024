let answer1 = 0;
let answer2 = 0;
let areaLetters = [];
let areaNumbers = [];
let areaNumber = 1;
let areaLetter = "";
let areaSizes = [];
let areaFenceLength = [];

fetch("data.txt")
//fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    areaLetters = textData.split("\r\n");
    for (let i = 0; i < areaLetters.length; i++) {
      areaLetters[i] = areaLetters[i].split("");
    }

    for (let y = 0; y < areaLetters.length; y++) {
      areaNumbers.push([]);
      for (let x = 0; x < areaLetters[y].length; x++) {
        areaNumbers[y].push(0);
      }
    }

    //make a new map with all the numbers for an area
    for (let y = 0; y < areaLetters.length; y++) {
      for (let x = 0; x < areaLetters[y].length; x++) {
        if (areaNumbers[y][x] == 0) {
          areaLetter = areaLetters[y][x];
          getArea(x, y);
          areaNumber++;
        }
      }
    }

    console.log("areaNumber");
    console.log(areaNumber);

    //find all the sizes of the areas
    for (let i = 0; i < areaNumber; i++) {
      let countArea = 0;
      for (let y = 0; y < areaLetters.length; y++) {
        for (let x = 0; x < areaLetters[y].length; x++) {
          if (areaNumbers[y][x] == i) {
            countArea++;
          }
        }
      }
      areaSizes.push(countArea);
    }
    console.log("areaSizes:");
    console.log(areaSizes);

    //find all the fence lengths of the areas
    for (let i = 0; i < areaNumber; i++) {
      let countFence = 0;
      for (let y = 0; y < areaLetters.length; y++) {
        for (let x = 0; x < areaLetters[y].length; x++) {
          if (areaNumbers[y][x] == i) {
            if (y == 0 || areaNumbers[y - 1][x] != i) {
              countFence++;
            }
            if (y == areaLetters.length - 1 || areaNumbers[y + 1][x] != i) {
              countFence++;
            }
            if (x == 0 || areaNumbers[y][x - 1] != i) {
              countFence++;
            }
            if (x == areaLetters[y].length - 1 || areaNumbers[y][x + 1] != i) {
              countFence++;
            }
          }
        }
      }
      areaFenceLength.push(countFence);
    }

    console.log("areaFenceLength:");
    console.log(areaFenceLength);

    //calculate answer
    for (let i = 0; i < areaFenceLength.length; i++) {
      answer1 = answer1 + areaSizes[i] * areaFenceLength[i];
    }

    console.log("answer1:");
    console.log(answer1);

    //part 2
    //calcultate sides instead of fenche length

    // side: 123 = 3      unique adjacent pairs: 12 23 =2    side = 3-2 = 1

    //find unique adjacent pairs on a side and subtract them from the side length
    let areaSides = [];
    for (let i = 0; i < areaNumber; i++) {
      let countSide = 0;
      for (let y = 0; y < areaLetters.length; y++) {
        for (let x = 0; x < areaLetters[y].length; x++) {
          if (areaNumbers[y][x] == i) {
            if (y == 0 || areaNumbers[y - 1][x] != i) {
              countSide++;
            }
            if (y == areaLetters.length - 1 || areaNumbers[y + 1][x] != i) {
              countSide++;
            }
            if (x == 0 || areaNumbers[y][x - 1] != i) {
              countSide++;
            }
            if (x == areaLetters[y].length - 1 || areaNumbers[y][x + 1] != i) {
              countSide++;
            }
          }
        }
      }
      //find unique adjacent pairs on a side and subtract them from the side length

      //find top top side
      //find left left side
      //find right right side
      //find bottom bottom side

      let findAllPairs = [];

      //123
      //456
      //789
      for (let y = 0; y < areaLetters.length; y++) {
        for (let x = 0; x < areaLetters[y].length; x++) {
          if (areaNumbers[y][x] == i) {
            //123 forwards
            if (x < areaLetters[y].length-1) {
              if (areaNumbers[y][x] == areaNumbers[y][x + 1]) {
                if (y == 0) {
                  findAllPairs.push(x + "-" + y + "|" + (x + 1) + "-" + y);
                } else if (
                  areaNumbers[y][x] != areaNumbers[y - 1][x] &&
                  areaNumbers[y][x] != areaNumbers[y - 1][x + 1]
                ) {
                  findAllPairs.push(x + "-" + y + "|" + (x + 1) + "-" + y);
                }
              }
            }
            //789 forwards
            if (x < areaLetters[y].length-1) {
              if (areaNumbers[y][x] == areaNumbers[y][x + 1]) {
                if (y == areaLetters.length - 1) {
                  findAllPairs.push(x + "-" + y + "|" + (x + 1) + "-" + y);
                } else if (
                  areaNumbers[y][x] != areaNumbers[y + 1][x] &&
                  areaNumbers[y][x] != areaNumbers[y + 1][x + 1]
                ) {
                  findAllPairs.push(x + "-" + y + "|" + (x + 1) + "-" + y);
                }
              }
            }
            //147 downwards
            if (y < areaLetters.length-1) {
              if (areaNumbers[y][x] == areaNumbers[y + 1][x]) {
                if (x == 0) {
                  findAllPairs.push(x + "-" + y + "|" + x + "-" + (y + 1));
                } else if (
                  areaNumbers[y][x] != areaNumbers[y][x - 1] &&
                  areaNumbers[y][x] != areaNumbers[y + 1][x - 1]
                ) {
                  findAllPairs.push(x + "-" + y + "|" + x + "-" + (y + 1));
                }
              }
            }
            //369 downwards
            if (y < areaLetters.length-1) {
              if (areaNumbers[y][x] == areaNumbers[y + 1][x]) {
                if (x == areaLetters[y].length - 1) {
                  findAllPairs.push(x + "-" + y + "|" + x + "-" + (y + 1));
                } else if (
                  areaNumbers[y][x] != areaNumbers[y][x + 1] &&
                  areaNumbers[y][x] != areaNumbers[y + 1][x + 1]
                ) {
                  findAllPairs.push(x + "-" + y + "|" + x + "-" + (y + 1));
                }
              }
            }
          }
        }
      }

      console.log("findAllPairs:");
      console.log(findAllPairs);

      countSide = countSide - findAllPairs.length;

      areaSides.push(countSide);
    }

    console.log("areaSides:");
    console.log(areaSides);

    //calculate answer
    for (let i = 0; i < areaSides.length; i++) {
      answer2 = answer2 + areaSizes[i] * areaSides[i];
    }

    console.log("answer2:");
    console.log(answer2);

    function getArea(x, y) {
      //find all adjacent letters in recursive function
      if (areaLetters[y][x] == areaLetter) {
        areaNumbers[y][x] = areaNumber;
        if (y > 0 && areaNumbers[y - 1][x] == 0) {
          getArea(x, y - 1);
        }
        if (y < areaLetters.length - 1 && areaNumbers[y + 1][x] == 0) {
          getArea(x, y + 1);
        }
        if (x > 0 && areaNumbers[y][x - 1] == 0) {
          getArea(x - 1, y);
        }
        if (x < areaLetters[y].length - 1 && areaNumbers[y][x + 1] == 0) {
          getArea(x + 1, y);
        }
      }
    }

    console.log("areaLetters");
    console.log(areaLetters);
    console.log("areaNumbers");
    console.log(areaNumbers);
  });
