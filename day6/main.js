let answer1 = 0;
let answer2 = 0;
let mapData;

let mapDataUint8Array;

let directions = [
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
];

let startPosition;

let currentDirection = 2;
let currentPosition = { x: 0, y: 0 };
let previousPosition = { x: 0, y: 0 };
let found = false;
//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    mapData = textData.split("\r\n");
    for (let i = 0; i < mapData.length; i++) {
      mapData[i] = mapData[i].split("");
    }

    findStartPosition();
    currentPosition.x = startPosition.x;
    currentPosition.y = startPosition.y;

    function checkPart1(mapDataToCheck) {
      for (let i = 0; i < 10000; i++) {
        previousPosition.x = currentPosition.x;
        previousPosition.y = currentPosition.y;
        mapDataToCheck[currentPosition.y][currentPosition.x] = "X";
        currentPosition.x = currentPosition.x + directions[currentDirection].x;
        currentPosition.y = currentPosition.y + directions[currentDirection].y;
        if (
          currentPosition.x < 0 ||
          currentPosition.x >= mapDataToCheck[0].length ||
          currentPosition.y < 0 ||
          currentPosition.y >= mapDataToCheck.length
        ) {
          for (let j = 0; j < mapDataToCheck.length; j++) {
            for (let k = 0; k < mapDataToCheck[j].length; k++) {
              if (mapDataToCheck[j][k] == "X") {
                answer1++;
              }
            }
          }
          break;
        }
        if (mapDataToCheck[currentPosition.y][currentPosition.x] == "#") {
          currentDirection++;
          if (currentDirection > 3) {
            currentDirection = 0;
          }
          currentPosition.x = previousPosition.x;
          currentPosition.y = previousPosition.y;
        }
      }
    }

    function checkPart2(mapDataToCheck) {
      for (let i = 0; i < 10000; i++) {
        previousPosition.x = currentPosition.x;
        previousPosition.y = currentPosition.y;
        mapDataToCheck[currentPosition.y][currentPosition.x] = "X";
        currentPosition.x = currentPosition.x + directions[currentDirection].x;
        currentPosition.y = currentPosition.y + directions[currentDirection].y;
        if (
          currentPosition.x < 0 ||
          currentPosition.x >= mapDataToCheck[0].length ||
          currentPosition.y < 0 ||
          currentPosition.y >= mapDataToCheck.length
        ) {
          //console.log("mapDataToCheck");
          //console.log(mapDataToCheck);
          return 0;
        }
        if (mapDataToCheck[currentPosition.y][currentPosition.x] == "#") {
          currentDirection++;
          if (currentDirection > 3) {
            currentDirection = 0;
          }
          currentPosition.x = previousPosition.x;
          currentPosition.y = previousPosition.y;
        }
      }
      return 1;
    }
    console.log("-- NONE optimized version --");
    let currentTime = performance.timeOrigin + performance.now();
    let checkTisMap = structuredClone(mapData);
    checkPart1(checkTisMap);
    let duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);
    console.log("answer1: " + answer1); //5199

    //console.log(currentPosition)
    //console.log(mapData);
    currentTime = performance.timeOrigin + performance.now();

    let value = 0;
    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        let tempMapData = structuredClone(mapData);
        tempMapData[i][j] = "#";
        currentPosition.x = startPosition.x;
        currentPosition.y = startPosition.y;
        currentDirection = 2;
        value = checkPart2(tempMapData);
        answer2 = answer2 + value;
      }
    }

    duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);
    console.log("answer2: " + answer2); //1915

    //////////////////////////////////////////////////////////////////////////
    // optimized version
    //////////////////////////////////////////////////////////////////////////

    let dimension = mapData.length;
    answer1 = 0;
    answer2 = 0;

    let mapDataUint8Array = new Uint8Array(mapData.length * mapData[0].length);
    //change # to 0 and . to 1
    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        if (mapData[i][j] == "#") {
          mapDataUint8Array[i * dimension + j] = 0;
        } else {
          mapDataUint8Array[i * dimension + j] = 1;
        }
      }
    }
    startPosition = startPosition.y * dimension + startPosition.x;
    currentPosition = startPosition;
    currentDirection = 0;
    directions = [-dimension, 1, dimension, -1];
    //now i got the mapData in a 1 dimensional Uint8Array

    function checkPart18(mapDataToCheck) {
      for (let i = 0; i < 7000; i++) {
        previousPosition = currentPosition;
        let x = currentPosition % dimension;
        mapDataToCheck[currentPosition] = 2;
        currentPosition = currentPosition + directions[currentDirection];
        if (currentPosition < 0 || currentPosition > dimension * dimension) {
          for (let j = 0; j < mapDataToCheck.length; j++) {
            if (mapDataToCheck[j] === 2) {
              answer1++;
            }
          }
          break;
          return;
        }
        if (mapDataToCheck[currentPosition] === 0) {
          currentDirection++;
          if (currentDirection > 3) {
            currentDirection = 0;
          }
          currentPosition = previousPosition;
        }
      }
    }

    //if you keep track of all the directions that are already checked you can recognize a loop

    //0 = #
    //1 = .

    //3 = up                              2         2^1 -> 2
    //5 = right                           4         2^2 -> 4
    //9 = down                            8         2^3 -> 8
    //17 = left                           16        2^4 -> 16

    //7 = up and right                    6
    //11 = up and down                    10
    //19 = up and left                    18
    //15 = up and right and down          14
    //23 = up and right and left          22
    //31 = up and right and down and left 30
    //27 = up and down and left           26
    //13 = right and down                 12
    //21 = right and left                 20
    //29 = right and down and left        28
    //25 = down and left                  24

    function checkPart28(mapDataToCheck) {
      for (let i = 0; i < 7000; i++) {
        previousPosition = currentPosition;
        let x = currentPosition % dimension;
        currentPosition = currentPosition + directions[currentDirection];

        if (
          currentPosition < 0 ||
          currentPosition > dimension * dimension ||
          (x === 0 && currentDirection === 3) ||
          (x === dimension - 1 && currentDirection === 1)
        ) {
          for (let j = 0; j < mapDataToCheck.length; j++) {
            if (mapDataToCheck[j] === 2) {
              return 0;
            }
          }
        }

        //check if i have a loop....
        //3 7 11 19 15 23 31 27
        if (mapDataToCheck[currentPosition] === 0) {
          currentDirection++;
          if (currentDirection > 3) {
            currentDirection = 0;
          }
          currentPosition = previousPosition;
        } else {
          if (currentDirection === 0) {
            if (
              mapDataToCheck[currentPosition] === 3 ||
              mapDataToCheck[currentPosition] === 7 ||
              mapDataToCheck[currentPosition] === 11 ||
              mapDataToCheck[currentPosition] === 19 ||
              mapDataToCheck[currentPosition] === 15 ||
              mapDataToCheck[currentPosition] === 23 ||
              mapDataToCheck[currentPosition] === 31 ||
              mapDataToCheck[currentPosition] === 27
            ) {
              //console.log("found a loop 0 - " + i);
              //return 1;
            }
          } else {
            if (currentDirection === 1) {
              //5 7 15 23 31 13 21 29
              if (
                mapDataToCheck[currentPosition] === 5 ||
                mapDataToCheck[currentPosition] === 7 ||
                mapDataToCheck[currentPosition] === 15 ||
                mapDataToCheck[currentPosition] === 23 ||
                mapDataToCheck[currentPosition] === 31 ||
                mapDataToCheck[currentPosition] === 13 ||
                mapDataToCheck[currentPosition] === 21 ||
                mapDataToCheck[currentPosition] === 29
              ) {
                //console.log("found a loop 1 - " + i);
                return 1;
              }
            } else {
              if (currentDirection === 2) {
                //9 11 15 31 27 13 25 29
                if (
                  mapDataToCheck[currentPosition] === 9 ||
                  mapDataToCheck[currentPosition] === 11 ||
                  mapDataToCheck[currentPosition] === 15 ||
                  mapDataToCheck[currentPosition] === 31 ||
                  mapDataToCheck[currentPosition] === 27 ||
                  mapDataToCheck[currentPosition] === 13 ||
                  mapDataToCheck[currentPosition] === 25 ||
                  mapDataToCheck[currentPosition] === 29
                ) {
                  //console.log("found a loop 2 - " + i);
                  return 1;
                }
              } else {
                if (currentDirection === 3) {
                  //17 19 23 31 27 21 29 25
                  if (
                    mapDataToCheck[currentPosition] === 17 ||
                    mapDataToCheck[currentPosition] === 19 ||
                    mapDataToCheck[currentPosition] === 23 ||
                    mapDataToCheck[currentPosition] === 31 ||
                    mapDataToCheck[currentPosition] === 27 ||
                    mapDataToCheck[currentPosition] === 21 ||
                    mapDataToCheck[currentPosition] === 29 ||
                    mapDataToCheck[currentPosition] === 25
                  ) {
                    //console.log("found a loop 3 - " + i);
                    return 1;
                  }
                }
              }
            }
          }
          mapDataToCheck[currentPosition] += Math.pow(currentDirection + 1, 2);
        }
      }
      return 1;
    }

    console.log("-- optimized version --");
    currentTime = performance.timeOrigin + performance.now();
    checkPart18(mapDataUint8Array);
    duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);
    console.log("answer1: " + answer1); //5199

    value = 0;
    currentTime = performance.timeOrigin + performance.now();

    for (let i = 0; i < mapDataUint8Array.length; i++) {
      if (
        mapDataUint8Array[i] === 0 ||
        i === startPosition ||
        mapDataUint8Array[i] === 1
      ) {
        continue;
      }
      let tempMapData = [...mapDataUint8Array];
      tempMapData[i] = 0;
      currentPosition = startPosition;
      currentDirection = 0;
      value = checkPart28(tempMapData);
      answer2 = answer2 + value;
    }

    duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);
    console.log("answer2: " + answer2); //1915
    console.log("end");
  });

function findStartPosition() {
  for (let i = 0; i < mapData.length; i++) {
    for (let j = 0; j < mapData[i].length; j++) {
      if (mapData[i][j] == "^") {
        startPosition = { x: j, y: i };
      }
    }
  }
}
