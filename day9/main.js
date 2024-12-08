let answer1 = 0;
let answer2 = 0;
let data = [];

fetch("data.txt")
  //fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    mapData = textData.split("\r\n");
  });
