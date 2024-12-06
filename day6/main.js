let answer1 = 0;
let answer2 = 0;
let mapData;

let directions = [
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
];

//optimise using a unit8array
//change # to 0 and . to 1

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
    //console.log(mapData);
    findStartPosition();
    //console.log(currentPosition);
    //console.log(mapData);

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

    let currentTime = performance.timeOrigin + performance.now();
    let checkTisMap = structuredClone(mapData) 
    checkPart1(checkTisMap);
    let duration = performance.timeOrigin + performance.now() - currentTime;
    //console.log("duration: " + duration);
    //console.log("answer1: " + answer1); //5199

    findStartPosition();
    //console.log(currentPosition)
    //console.log(mapData);
    currentTime = performance.timeOrigin + performance.now();

    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        let tempMapData = structuredClone(mapData) 
        tempMapData[i][j] = "#"; 
        //console.log("checkThis:")
        //console.log(tempMapData); 
        findStartPosition();
        currentDirection = 2;
        let value = checkPart2(tempMapData);
        //console.log("value: " + value);
        answer2 = answer2 + value
      }
    }
    duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);
    console.log("answer2: " + answer2); //???
  });

function findStartPosition() {
  for (let i = 0; i < mapData.length; i++) {
    for (let j = 0; j < mapData[i].length; j++) {
      if (mapData[i][j] == "^") {
        currentPosition = { x: j, y: i };
      }
    }
  }
}
