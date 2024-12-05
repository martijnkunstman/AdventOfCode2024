let answer1 = 0;
let answer2 = 0;
let data;
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    data = textData.split("\r\n");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split("x").map(Number);
      let smallest = data[i].sort((a, b) => a - b)[0]*data[i].sort((a, b) => a - b)[1];
      answer1 +=
        smallest +
        2 * data[i][0] * data[i][1] +
        2 * data[i][1] * data[i][2] +
        2 * data[i][2] * data[i][0];

        answer2 += 2 * data[i].sort((a, b) => a - b)[0] + 2 * data[i].sort((a, b) => a - b)[1];
        answer2 += data[i][0] * data[i][1] * data[i][2];

    }
    //console.log(data);

    console.log("answer1: " + answer1);
    console.log("answer2: " + answer2);
  });
