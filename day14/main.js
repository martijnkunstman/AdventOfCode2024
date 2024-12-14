let answer1 = 0;
let answer2 = 0;
let data = [];

let sizex = 101;
let sizey = 103;

let seconds = 0;

//sizex = 11
//sizey = 7

fetch("data.txt")
  //fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    let temp = textData.split("\r\n");
    for (let i = 0; i < temp.length; i++) {
      temp[i] = temp[i].replace(" ", ",");
      temp[i] = temp[i].replace("p=", "");
      temp[i] = temp[i].replace("v=", "");
      temp[i] = temp[i].split(",").map(Number);
    }
    data = temp;

    /*
    setInterval(() => {
      printMap();
    }, 1000);
    */

    //console.log(data);
    /*
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < data.length; j++) {
        data[j][0] += data[j][2];
        data[j][1] += data[j][3];
        if (data[j][0] >= sizex) {
          {
            data[j][0] = data[j][0] - sizex;
          }
        }
        if (data[j][1] >= sizey) {
          {
            data[j][1] = data[j][1] - sizey;
          }
        }
        if (data[j][0] < 0) {
          {
            data[j][0] = sizex + data[j][0];
          }
        }
        if (data[j][1] < 0) {
          {
            data[j][1] = sizey + data[j][1];
          }
        }
      }
    }
    //console.log(data);
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;

    //make map
    let map = [];
    for (let i = 0; i < sizey; i++) {
      map.push([]);
      for (let j = 0; j < sizex; j++) {
        map[i].push(0);
      }
    }
    //console.log(map);


    for (let i = 0; i < data.length; i++) {
      
      map[data[i][1]][data[i][0]]+=1;

      if (data[i][0] > Math.floor(sizex/2) && data[i][1] > Math.floor(sizey/2)) {
        q1 += 1;
      }
      if (data[i][0] < Math.floor(sizex/2) && data[i][1] > Math.floor(sizey/2)) {
        q2 += 1;
      }
      if (data[i][0] < Math.floor(sizex/2) && data[i][1] < Math.floor(sizey/2)) {
        q3 += 1;
      }
      if (data[i][0] > Math.floor(sizex/2) && data[i][1] < Math.floor(sizey/2)) {
        q4 += 1;
      }
    }
    let answer = q1 * q2 * q3 * q4;
    console.log(answer);//126262500 to low
    */
    //console.log(map);

    let steps = 5303;
    for (i = 0; i < steps - 2; i++) {
      printMap(false);
    }
    printMap(true);
  });

  //5200
  //5248
  //5303
  //5349
  //5406
  //5450
  //5509

  



function printMap(print) {
  console.clear();
  seconds++;
  console.log(seconds);
  document.getElementById("seconds").innerHTML = seconds;
  for (let j = 0; j < data.length; j++) {
    data[j][0] += data[j][2];
    data[j][1] += data[j][3];
    if (data[j][0] >= sizex) {
      {
        data[j][0] = data[j][0] - sizex;
      }
    }
    if (data[j][1] >= sizey) {
      {
        data[j][1] = data[j][1] - sizey;
      }
    }
    if (data[j][0] < 0) {
      {
        data[j][0] = sizex + data[j][0];
      }
    }
    if (data[j][1] < 0) {
      {
        data[j][1] = sizey + data[j][1];
      }
    }
  }
  let map = [];
  for (let i = 0; i < sizey; i++) {
    map.push([]);
    for (let j = 0; j < sizex; j++) {
      map[i].push(0);
    }
  }
  for (let i = 0; i < data.length; i++) {
    map[data[i][1]][data[i][0]] += 1;
  }
  if (print) {
    for (let i = 0; i < sizey; i++) {
      console.log(map[i].toString().replace(/0/g, " "));
    }
  }
}

//5000 is to low....

//50
