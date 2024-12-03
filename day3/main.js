fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    textData.replaceAll("\n", "");

    function solveMul(data) {
      let answer = 0;
      console.log("l1:" + data.length);
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(")")[0];
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].split(",").length == 2) {
          data[i] = data[i].split(",").map(Number);
        } else {
          data[i] = "";
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].length === 2) {
          if (!isNaN(data[i][0]) && !isNaN(data[i][1])) {
            answer = answer + data[i][0] * data[i][1];
          }
        } else {
          data[i] = "";
        }
      }
      return answer;
    }
    
    let data = textData.split("mul(");
    console.log("answer:");
    console.log(solveMul(data));//187194524
    
    //
    // part 2
    //
    let data2 = textData.split("don't()");
    let temp1 = data2[0];
    for (let i = 1; i < data2.length; i++) {
      data2[i] = data2[i].split("do()");
      let temp2 = "";
      for (let j = 1; j < data2[i].length; j++) {
        temp2 = temp2 + data2[i][j];
      }
      temp1 = temp1 + temp2;
    }
    data = temp1.split("mul(");
    console.log("answer:");
    console.log(solveMul(data));//127092535

  });
