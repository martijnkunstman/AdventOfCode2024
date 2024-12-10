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
          count9s = finds9s(x, y);
        }
        answer1 += count9s;
      }
    }
    function find9s(x,y)
    {
      //first find all the 9's that are possible...
      let possible9s = [];
      //then check for those 9s if there is a path back to the 0
    }

  });
