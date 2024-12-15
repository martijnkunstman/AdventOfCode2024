let answer1 = 0;
let answer2 = 0;
let mapData = [];
let robotInstructions = "";
let robotPosition = { x: 0, y: 0 };

//fetch("data.txt")
//fetch("data_real_simple.txt")
fetch("data_simple.txt")
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
    //now make the map bigger

    //If the tile is #, the new map contains ## instead.
    //If the tile is O, the new map contains [] instead.
    //If the tile is ., the new map contains .. instead.
    //If the tile is @, the new map contains @. instead.

    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        if (mapData[i][j] == "#") {
          mapData[i][j] = "##";
        }
        if (mapData[i][j] == "O") {
          mapData[i][j] = "[]";
        }
        if (mapData[i][j] == ".") {
          mapData[i][j] = "..";
        }
        if (mapData[i][j] == "@") {
          mapData[i][j] = "@.";
        }
      }
    }

    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        mapData[i] = mapData[i].join("").split("");
      }
    }

    htmlDrawMap();

    robotInstructions = robotInstructions.split("");
    findRobotPosition();
    console.log("Map Data:");
    console.log(mapData);
    console.log("Robot Instructions:");
    console.log(robotInstructions);

    /*
    for (let step = 0; step < robotInstructions.length; step++) {
      moveRobot(robotInstructions[step]);
      let tempMap = [...mapData];
      for (let i = 0; i < tempMap.length; i++) {
        tempMap[i] = tempMap[i].join("");
        //console.log(tempMap[i]);
      }
      //console.log("Step: " + step);
    }
      */

    calculateAnswer1();
    console.log("Answer 1: " + answer1);
  });

document.addEventListener("keydown", (event) => {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  console.log("Key pressed: " + key);
  let direction = "";
  if (key == "D" || key == "d") {
    direction = ">";
  }
  if (key == "A" || key == "a") {
    direction = "<";
  }
  if (key == "W" || key == "w") {
    direction = "^";
  }
  if (key == "S" || key == "s") {
    direction = "v";
  }

  if (key == "ArrowRight") {
    direction = ">";
  }
  if (key == "ArrowLeft") {
    direction = "<";
  }
  if (key == "ArrowUp") {
    direction = "^";
  }
  if (key == "ArrowDown") {
    direction = "v";
  }
  console.log("Move robot: " + direction);

  moveRobot(direction);
  htmlDrawMap();
});

function htmlDrawMap() {
  let container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < mapData.length; i++) {
    for (let j = 0; j < mapData[i].length; j++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      if (mapData[i][j] == "#") {
        tile.classList.add("wall");
      }
      if (mapData[i][j] == "]") {
        tile.classList.add("box");
        tile.classList.add("boxright");
      }
      if (mapData[i][j] == "[") {
        tile.classList.add("box");
        tile.classList.add("boxleft");
      }
      if (mapData[i][j] == ".") {
        tile.classList.add("empty");
      }
      if (mapData[i][j] == "@") {
        tile.classList.add("robot");
      }
      tile.innerHTML = mapData[i][j];
      tile.style.top = i * 20 + "px";
      tile.style.left = j * 20 + "px";
      container.appendChild(tile);
    }
  }
}

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
    if (mapData[robotPosition.y][robotPosition.x + 1] == "[") {
      //valid move there is an empty space (.) up to a wall (#)
      //if an empty space is found move the box (O) there
      let tempX = robotPosition.x;
      do {
        tempX++;
        if (mapData[robotPosition.y][tempX] == ".") {
          //mapData[robotPosition.y][tempX] = "O";
          //move all the boxes to the right up to the point
          for (let i = robotPosition.x; i < tempX; i += 2) {
            mapData[robotPosition.y][i] = "[";
            mapData[robotPosition.y][i + 1] = "]";
          }
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
    if (mapData[robotPosition.y][robotPosition.x - 1] == "]") {
      //valid move there is an empty space (.) up to a wall (#)
      //if an empty space is found move the box (O) there
      let tempX = robotPosition.x;
      do {
        tempX--;
        if (mapData[robotPosition.y][tempX] == ".") {
          //mapData[robotPosition.y][tempX] = "O";
          //move all the boxes to the right up to the point
          for (let i = tempX; i < robotPosition.x; i += 2) {
            mapData[robotPosition.y][i] = "[";
            mapData[robotPosition.y][i + 1] = "]";
          }
          mapData[robotPosition.y][robotPosition.x] = ".";
          robotPosition.x--;
          mapData[robotPosition.y][robotPosition.x] = "@";
          return;
        }
      } while (mapData[robotPosition.y][tempX] != "#");
      //not found an empty space, so no valid move
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
    // here it starts to be a bit more complicated
    //.....
    if (
      mapData[robotPosition.y - 1][robotPosition.x] == "[" ||
      mapData[robotPosition.y - 1][robotPosition.x] == "]"
    ) {
      //lets find out of any conecting boxes searching up bumb into a wall
      //if not find a wall than move all connecting boxes up
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
    // here it starts to be a bit more complicated
    //.....
    if (
      mapData[robotPosition.y + 1][robotPosition.x] == "[" ||
      mapData[robotPosition.y + 1][robotPosition.x] == "]"
    ) {
      //lets find out of any conecting boxes searching up bumb into a wall
      //if not find a wall than move all connecting boxes up
    }
  }
}
