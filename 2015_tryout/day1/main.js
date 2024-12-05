let answer1 = 0;
let answer2 = 0;
let data;
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    data = textData.split("");
    console.log(data);
    let found = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "(") {
        answer1++;
      } else {
        answer1--;
      }
      if (answer1 === -1&&!found) {
        answer2 = i + 1;
        found = true;
      }
    }
     
    console.log("answer1: " + answer1);
    console.log("answer2: " + answer2);
  });