let answer1 = 0;
let answer2 = 0;
let mapData = [];

fetch("data.txt")
  //  fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    mapData = textData.split("\r\n");
    for (let i = 0; i < mapData.length; i++) {
      mapData[i] = mapData[i].split("").map(Number);
    }
    console.log(mapData);

    //
    // check for all the zeros in the map how many 9s they can reach
    //

    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        let count9s = 0;
        if (mapData[y][x] == 0) {
          count9s = find9s(x, y, 1);
        }
        answer1 += count9s;
      }
    }

    console.log("Answer1: " + answer1);

    function find9s(x0, y0, part) {
      let startPosition = { x: x0, y: y0 }; //this is the position of the 0
      //first find all the 9's that are possible...
      let possible9s = [];
      for (let y9 = y0 - 9; y9 <= y0 + 9; y9++) {
        for (let x9 = x0 - 9; x9 <= x0 + 9; x9++) {
          if (
            x9 >= 0 &&
            x9 < mapData[0].length &&
            y9 >= 0 &&
            y9 < mapData.length
          ) {
            if (Math.abs(y9 - y0) + Math.abs(x9 - x0) <= 9) {
              if (mapData[y9][x9] == 9) {
                possible9s.push({ x: x9, y: y9 });
              }
            }
          }
        }
      }

      //then check for those 9s if there is a path back to the 0
      //console.log("startPosition:");
      //console.log(startPosition);
      //console.log("possible9s:");
      //console.log(possible9s);

      let pathMap = [];

      for (let y = 0; y < mapData.length; y++) {
        pathMap.push([]);
        for (let x = 0; x < mapData[y].length; x++) {
          pathMap[y].push(0);
        }
      }

      //make pathMap
      for (let height = 0; height < 10; height++) {
        if (height == 0) {
          pathMap[startPosition.y][startPosition.x] = height + 1;
        } else {
          //find all the heights that are next to 1 positions
          for (let y = 0; y < pathMap.length; y++) {
            for (let x = 0; x < pathMap[y].length; x++) {
              if (pathMap[y][x] == height) {
                if (y > 0) {
                  if (mapData[y - 1][x] == height) {
                    pathMap[y - 1][x] = height + 1;
                  }
                }
                if (y < mapData.length - 1) {
                  if (mapData[y + 1][x] == height) {
                    pathMap[y + 1][x] = height + 1;
                  }
                }

                if (x > 0) {
                  if (mapData[y][x - 1] == height) {
                    pathMap[y][x - 1] = height + 1;
                  }
                }

                if (x < mapData[y].length - 1) {
                  if (mapData[y][x + 1] == height) {
                    pathMap[y][x + 1] = height + 1;
                  }
                }
              }
            }
          }
        }
      }

      //console.log("startPosition:");
      //console.log(startPosition);
      //.log("pathMap:");
      //console.log(pathMap);
      //console.log("mapData:");
      //console.log(mapData);

      //check if 9s are in pathMap
      let count9s = 0;
      if (part == 1) {
        for (let i = 0; i < possible9s.length; i++) {
          if (pathMap[possible9s[i].y][possible9s[i].x] != 0) {
            count9s++;
          }
        }
      }
      //console.log(count9s);
      return count9s;
    }

    //-----part 2------

    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        let count9s = 0;
        if (mapData[y][x] == 0) {
          count9s = check(x, y, mapData);
        }
        answer2 += count9s;
      }
    }
    console.log("Answer2: " + answer2);
  });

//--------------------TESTS---------------------

//test if this checks the right 9s for the 0

let testMap = [];
for (let y = 0; y < 50; y++) {
  testMap.push([]);
  for (let x = 0; x < 50; x++) {
    testMap[y].push("_");
  }
}

find9sTest(20, 20);

function find9sTest(x0, y0) {
  for (let y9 = y0 - 9; y9 <= y0 + 9; y9++) {
    for (let x9 = x0 - 9; x9 <= x0 + 9; x9++) {
      if (x9 >= 0 && x9 < testMap[0].length && y9 >= 0 && y9 < testMap.length) {
        if (Math.abs(y9 - y0) + Math.abs(x9 - x0) <= 9) {
          testMap[y9][x9] = "*";
        }
      }
    }
  }
  testMap[y0][x0] = "#";
}

for (let y = 0; y < testMap.length; y++) {
  testMap[y] = testMap[y].join("");
}

console.log(testMap);

let testMap2 = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 4, 5, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 6, 7, 8, 9, 0, 0, 0],
  [4, 0, 0, 0, 8, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 9, 0, 0, 0, 0, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 0, 0, 0, 0, 0, 9, 0, 0],
  [8, 0, 0, 0, 0, 0, 9, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function check(x, y, map) {
  let found = 0;
  function walk(x, y, h) {
    if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) return;
    if (map[y][x] !== h) return;
    if (map[y][x] === 9) {
      found++;
      return;
    }
    walk(x - 1, y, h + 1);
    walk(x + 1, y, h + 1);
    walk(x, y - 1, h + 1);
    walk(x, y + 1, h + 1);
  }
  walk(x, y, 0);
  return found;
}

let pathCount = check(0, 0, testMap2);
console.log("pathCount:", pathCount);
