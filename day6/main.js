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

    //0 = #
    //1 = .
    //2 = up                              1  
    //3 = right                           1
    //4 = down                            1
    //5 = left                            1
    //6 = up and right                    2
    //7 = up and down                     2
    //8 = up and left                     2
    //9 = up and right and down           3
    //10 = up and right and left          3
    //11 = up and right and down and left 4
    //12 = up and down and left           3
    //13 = right and down                 2  
    //14 = right and left                 2
    //15 = right and down and left        3
    //16 = down and left                  2

    function checkPart28(mapDataToCheck) {
      for (let i = 0; i < 7000; i++) {
        previousPosition = currentPosition;
        let x = currentPosition % dimension;
        currentPosition = currentPosition + directions[currentDirection];
        if (currentPosition < 0 || currentPosition > dimension * dimension || (x ===0  && currentDirection === 3) ||  (x ===dimension - 1  && currentDirection === 1)  ) {
          for (let j = 0; j < mapDataToCheck.length; j++) {
            if (mapDataToCheck[j] === 2) {
              return 0;
            }
          }
        }
        if (mapDataToCheck[currentPosition] === 0) {
          currentDirection++;
          if (currentDirection > 3) {
            currentDirection = 0;
          }
          currentPosition = previousPosition;
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
        if (mapDataUint8Array[i] === 0 || i === startPosition || mapDataUint8Array[i] === 1) {
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
