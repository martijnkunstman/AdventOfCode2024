let answer1 = 0;
let answer2 = 0;
let mapData = [];
let mapData2 = [];

fetch("data.txt")
//fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    mapData = textData.split("\r\n");
    for (let i = 0; i < mapData.length; i++) {
      mapData[i] = mapData[i].split("");
    }

    //create a new map with the same size
    for (let i = 0; i < mapData.length; i++) {
      mapData2.push([]);
      for (let j = 0; j < mapData[i].length; j++) {
        mapData2[i].push(0);
      }
    }

    console.log(mapData);

    //part 1

    console.log("-- NONE optimized version --");
    let currentTime = performance.timeOrigin + performance.now();
    
    //got through the complete map and find not dots...
    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        if (mapData[y][x] != "." && mapData[y][x] != "#") {
          let charToFind = mapData[y][x];
          findAndMark(charToFind, x, y, 1);
        }
      }
    }

    //count all the #
    for (let i = 0; i < mapData2.length; i++) {
      for (let j = 0; j < mapData2[i].length; j++) {
        if (mapData2[i][j] == 1) {
          answer1++;
        }
      }
    }

    let duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration part 1: " + duration);
   

    //part 2

    currentTime = performance.timeOrigin + performance.now();

    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        if (mapData[y][x] != "." && mapData[y][x] != "#") {
          let charToFind = mapData[y][x];
          findAndMark(charToFind, x, y, 2);
        }
      }
    }

    //count all the #
    for (let i = 0; i < mapData2.length; i++) {
      for (let j = 0; j < mapData2[i].length; j++) {
        if (mapData2[i][j] == 1) {
          answer2++;
        }
      }
    }

    
    duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration part 2: " + duration);


    function findAndMark(charToFind, x1, y1, part) {
      for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
          if (mapData[y][x] == charToFind) {
            //found char now reflect it
            let x2 = x;
            let y2 = y;
            let differenceX = x1 - x2;
            let differenceY = y1 - y2;
            let newx = x1 + differenceX;
            let newy = y1 + differenceY;
            if (part == 1) {
              if (
                differenceX != 0 &&
                differenceY != 0 &&
                newx >= 0 &&
                newx < mapData[0].length &&
                newy >= 0 &&
                newy < mapData.length
              ) {
                mapData2[newy][newx] = 1;
              }
            } else {
              for (let i = 0; i < mapData.length; i++) {
                {
                newx = x1 + differenceX * i;
                newy = y1 + differenceY * i;
                }
              if (
                differenceX != 0 &&
                differenceY != 0 &&
                newx >= 0 &&
                newx < mapData[0].length &&
                newy >= 0 &&
                newy < mapData.length
              ) {
                mapData2[newy][newx] = 1;
              }
            }
            }
          }
        }
      }
    }

    console.log("answer1: " + answer1); //361
    console.log("answer2: " + answer2); //1249 
  });
