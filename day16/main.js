let answer1 = 0;
let answer2 = 0;
let mapData = [];
let startPosition;
let endPosition;
let position;
let directions = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];
let direction = 1;
let rotateDirection = 1;

//fetch("data.txt")
fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    let temp = textData.split("\r\n");
    for (let i = 0; i < temp.length; i++) {
      mapData.push(temp[i].split(""));
    }

    consoleLogMap();
    findStartPosition();
    findEndPosition();
    console.log(startPosition);
    console.log(endPosition);
    removeDeadEnds();
    checkSolution(startPosition);
    consoleLogMap();
  });

//
//return all possible paths in the maze from start to end
//
//map . = empty space
//map # = wall
//
function consoleLogMap() {
  let temp = "";
  for (let i = 0; i < mapData.length; i++) {
    temp = temp + mapData[i].join("") + "\n";
  }
  temp = temp.replaceAll(".", " ");
  temp = temp.replaceAll("0", ".");
  //temp = temp.replaceAll("#", "■");

  console.log(temp);
}

function removeDeadEnds() {
  let deadEnd = false;
  do {
    deadEnd = false;
    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        if (mapData[y][x] == ".") {
          let count = 0;
          if (mapData[y + 1][x] == "#") {
            count++;
          }
          if (mapData[y - 1][x] == "#") {
            count++;
          }
          if (mapData[y][x + 1] == "#") {
            count++;
          }
          if (mapData[y][x - 1] == "#") {
            count++;
          }
          if (count >= 3) {
            if (
              (y == startPosition.y && x == startPosition.x) ||
              (y == endPosition.y && x == endPosition.x)
            ) {
              //do nothing because it is the start or end position
            } else {
              mapData[y][x] = "#";
              deadEnd = true;
            }
          }
        }
      }
    }
  } while (deadEnd);
}

function checkSolution(startPosition) {
  position = {
    x: startPosition.x,
    y: startPosition.y,
  };

  //while (position.x != endPosition.x && position.y != endPosition.y) {
  let foundEndpoint = false;

  while (!foundEndpoint) {
    let newPosition = {
      x: position.x + directions[direction].x,
      y: position.y + directions[direction].y,
    };
    if (newPosition.x == endPosition.x && newPosition.y == endPosition.y) {
      foundEndpoint = true;
      console.log("Found endpoint");
      break;
    }
    if (
      mapData[newPosition.y][newPosition.x] == "." ||
      mapData[newPosition.y][newPosition] == "0"
    ) {
      if (mapData[newPosition.y][newPosition.x] == "0") {
        rotateDirection = -rotateDirection;
      }
      mapData[newPosition.y][newPosition.x] = "0";
      position.x = newPosition.x;
      position.y = newPosition.y;
    } else {
      direction = direction + rotateDirection;
      if (direction > 3) {
        direction = 0;
      }
      if (direction < 0) {
        direction = 3;
      }
    }
  }
}

function findStartPosition() {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      if (mapData[y][x] == "S") {
        startPosition = { x: x, y: y };
        mapData[y][x] = ".";
        break;
      }
    }
  }
}

function findEndPosition() {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      if (mapData[y][x] == "E") {
        endPosition = { x: x, y: y };
        mapData[y][x] = ".";
        break;
      }
    }
  }
}
