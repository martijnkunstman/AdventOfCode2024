let answer1 = 0;
let answer2 = 0;
let data;
//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    textData.replaceAll("\n", "");
    data = textData.split(" ");

    console.log("answer1: " + answer1);
    console.log("answer2: " + answer2);
  });