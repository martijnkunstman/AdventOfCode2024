fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    let answer = 0;
    let answer2 = 0;
    textData.replaceAll("\n", "");
    let data = textData.split("mul(");
    console.log("l1:"+data.length);
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split(")")[0];
    }
    //console.log(data);
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
    console.log("answer:");
    console.log(answer);
    //
    // part 2
    //
    let data2 = textData.split("don't()");
    let temp = data2[0];
    console.log(temp);
    for (let i = 1; i < data2.length; i++) {
      data2[i] = data2[i].split("do()");
      let temp3 = "";
      for (let j = 1; j < data2[i].length; j++) {
        temp3 = temp3 + data2[i][j];
      }
      temp = temp + temp3;
    }
    
    console.log(temp);

    data = temp.split("mul(");
    console.log("l2:"+data.length);
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split(")")[0];
    }
    //console.log(data);
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
          answer2 = answer2 + data[i][0] * data[i][1];
        }
      } else {
        data[i] = "";
      }
    }                        
    console.log("answer2:"); 
    console.log(answer2);
  });
