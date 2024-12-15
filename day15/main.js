let answer1 = 0;
let answer2 = 0;
let mapData = [];
let robotInstructions = "";
let robotPosition = { x: 0, y: 0 };

fetch("data.txt")
//fetch("data_simple.txt")
//fetch("data_real_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    let temp = textData.split("\r\n");
    foundRobot = false;
    for (let i = 0; i < temp.length; i++) {
      if (foundRobot) {
        robotInstructions += temp[i];
      } else if (temp[i].length > 0) {
        mapData.push(temp[i].split(""));
      } else {
        foundRobot = true;
      }
    }
    robotInstructions = robotInstructions.split("");
    findRobotPosition();
    console.log("Map Data:");
    console.log(mapData);
    console.log("Robot Instructions:");
    console.log(robotInstructions);

    for (let step = 0; step < robotInstructions.length; step++) {
      moveRobot(robotInstructions[step]);
      let tempMap = [...mapData];
      for (let i = 0; i < tempMap.length; i++) {
        tempMap[i] = tempMap[i].join("");
        //console.log(tempMap[i]);
      }
      //console.log("Step: " + step);
    }

    calculateAnswer1();
    console.log("Answer 1: " + answer1);


  });

function findRobotPosition() {
  for (let i = 0; i < mapData.length; i++) {
    for (let j = 0; j < mapData[i].length; j++) {
      if (mapData[i][j] == "@") {
        //mapData[i][j] = ".";
        robotPosition.x = j;
        robotPosition.y = i;
        return;
      }
    }
  }
}

function calculateAnswer1() {
  answer1 = 0;
  for (let i = 0; i < mapData.length; i++) {
    for (let j = 0; j < mapData[i].length; j++) {
      if (mapData[i][j] == "O") {
        answer1 = answer1 + i * 100 + j;
      }
    }
  }
  return answer1;
}

function moveRobot(direction) {
  if (direction == ">") {
    //move right
    //see if move is valid...
    if (mapData[robotPosition.y][robotPosition.x + 1] == "#") {
      //not a valid move there is al wall (#)
      return;
    }
    if (mapData[robotPosition.y][robotPosition.x + 1] == ".") {
      //valid move there is an empty space (.)
      mapData[robotPosition.y][robotPosition.x] = ".";
      robotPosition.x++;
      mapData[robotPosition.y][robotPosition.x] = "@";
      return;
    }
    if (mapData[robotPosition.y][robotPosition.x + 1] == "O") {
      //valid move there is an empty space (.) up to a wall (#)
      //if an empty space is found move the box (O) there
      let tempX = robotPosition.x;
      do {
        tempX++;
        if (mapData[robotPosition.y][tempX] == ".") {
          mapData[robotPosition.y][tempX] = "O";
          mapData[robotPosition.y][robotPosition.x] = ".";
          robotPosition.x++;
          mapData[robotPosition.y][robotPosition.x] = "@";
          return;
        }
      } while (mapData[robotPosition.y][tempX] != "#");
      //not found an empty space, so no valid move
      return;
    }
  } else if (direction == "<") {
    //move left
    //see if move is valid...
    if (mapData[robotPosition.y][robotPosition.x - 1] == "#") {
      //not a valid move there is al wall (#)
      return;
    }
    if (mapData[robotPosition.y][robotPosition.x - 1] == ".") {
      //valid move there is an empty space (.)
      mapData[robotPosition.y][robotPosition.x] = ".";
      robotPosition.x--;
      mapData[robotPosition.y][robotPosition.x] = "@";
      return;
    }
    if (mapData[robotPosition.y][robotPosition.x - 1] == "O") {
      //valid move there is an empty space (.) up to a wall (#)
      //if an empty space is found move the box (O) there
      let tempX = robotPosition.x;
      do {
        tempX--;
        if (mapData[robotPosition.y][tempX] == ".") {
          mapData[robotPosition.y][tempX] = "O";
          mapData[robotPosition.y][robotPosition.x] = ".";
          robotPosition.x--;
          mapData[robotPosition.y][robotPosition.x] = "@";
          return;
        }
      } while (mapData[robotPosition.y][tempX] != "#");
      //not found an empty space, so no valid move
      return;
    }
  } else if (direction == "^") {
    //move up
    //see if move is valid...
    if (mapData[robotPosition.y - 1][robotPosition.x] == "#") {
      //not a valid move there is al wall (#)
      return;
    }
    if (mapData[robotPosition.y - 1][robotPosition.x] == ".") {
      //valid move there is an empty space (.)
      mapData[robotPosition.y][robotPosition.x] = ".";
      robotPosition.y--;
      mapData[robotPosition.y][robotPosition.x] = "@";
      return;
    }
    if (mapData[robotPosition.y - 1][robotPosition.x] == "O") {
      //valid move there is an empty space (.) up to a wall (#)
      //if an empty space is found move the box (O) there
      let tempY = robotPosition.y;
      do {
        tempY--;
        if (mapData[tempY][robotPosition.x] == ".") {
          mapData[tempY][robotPosition.x] = "O";
          mapData[robotPosition.y][robotPosition.x] = ".";
          robotPosition.y--;
          mapData[robotPosition.y][robotPosition.x] = "@";
          return;
        }
      } while (mapData[tempY][robotPosition.x] != "#");
      //not found an empty space, so no valid move
      return;
    }
  } else if (direction == "v") {
    //move down
    //see if move is valid...
    if (mapData[robotPosition.y + 1][robotPosition.x] == "#") {
      //not a valid move there is al wall (#)
      return;
    }
    if (mapData[robotPosition.y + 1][robotPosition.x] == ".") {
      //valid move there is an empty space (.)
      mapData[robotPosition.y][robotPosition.x] = ".";
      robotPosition.y++;
      mapData[robotPosition.y][robotPosition.x] = "@";
      return;
    }
    if (mapData[robotPosition.y + 1][robotPosition.x] == "O") {
      //valid move there is an empty space (.) up to a wall (#)
      //if an empty space is found move the box (O) there
      let tempY = robotPosition.y;
      do {
        tempY++;
        if (mapData[tempY][robotPosition.x] == ".") {
          mapData[tempY][robotPosition.x] = "O";
          mapData[robotPosition.y][robotPosition.x] = ".";
          robotPosition.y++;
          mapData[robotPosition.y][robotPosition.x] = "@";
          return;
        }
      } while (mapData[tempY][robotPosition.x] != "#");
      //not found an empty space, so no valid move
      return;
    }
  }
}
