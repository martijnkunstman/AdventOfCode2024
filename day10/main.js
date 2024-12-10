let answer1 = 0;
let answer2 = 0;
let mapData = [];

//fetch("data.txt")
fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    mapData = textData.split("\r\n");
    for (let i = 0; i < mapData.length; i++) {
      mapData[i] = mapData[i].split("").map(Number);
    }
    console.log(mapData);
    //
    //check for all the zeros in the map how many 9s they can reach
    //
    for (let y = 0; y < mapData.length; i++) {
      for (let x = 0; x < mapData[i].length; j++) {
        let count9s = 0;
        if (mapData[y][x] == 0) {
          count9s = find9s(x, y);
        }
        answer1 += count9s;
      }
    }
    function find9s(x0, y0) {
      let startPosition = { x: x0, y: y0 }; //this is the position of the 0
      //first find all the 9's that are possible...
      let possible9s = [];
      for (let y9 = y0 - 9; y9 <= y0 + 9; y9++) {
        for (let x9 = x0 - 9; x9 <= x0 + 9; x9++) {
          if (
            x9 >= 0 &&
            x9 < testMap[0].length &&
            y9 >= 0 &&
            y9 < testMap.length
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
    }
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
