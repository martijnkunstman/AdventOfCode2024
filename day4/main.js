let answer1 = 0;
let answer2 = 0;
let data;
//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    data = textData.split("\r\n");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split("");
    }

    //to do to optimise... 
    
    //convert letters to numbers and use Uint8Array

    /*

    X -> 1
    M -> 2
    A -> 3
    S -> 4

    */

    //nest ifs and make them simpler
    //use continues and breaks

    for (y = 0; y < data.length; y++) {
      for (x = 0; x < data[y].length; x++) {
        //horizontal -
        let hor, ver, dia1, dia2;
        if (x < data[y].length - 3) {
          hor = data[x][y] + data[x + 1][y] + data[x + 2][y] + data[x + 3][y];
        }
        //vertical |
        if (y < data.length - 3) {
          ver = data[x][y] + data[x][y + 1] + data[x][y + 2] + data[x][y + 3];
        }
        //diagonal1 \
        if (x < data[y].length - 3 && y < data.length - 3) {
          dia1 =
            data[x][y] +
            data[x + 1][y + 1] +
            data[x + 2][y + 2] +
            data[x + 3][y + 3];
        }
        //diagonal2 /
        if (x > 2 && y < data.length - 3) {
          dia2 =
            data[x][y] +
            data[x - 1][y + 1] +
            data[x - 2][y + 2] +
            data[x - 3][y + 3];
        }

        if (hor == "XMAS" || hor == "SAMX") answer1++;
        if (ver == "XMAS" || ver == "SAMX") answer1++;
        if (dia1 == "XMAS" || dia1 == "SAMX") answer1++;
        if (dia2 == "XMAS" || dia2 == "SAMX") answer1++;
      }
    }

    console.log("answer1: " + answer1); //2718

    for (y = 0; y < data.length; y++) {
      for (x = 0; x < data[y].length; x++) {
        if (x < data[y].length - 2 && y < data.length - 2) {
      
          //M M     M S     S M     S S
          // A       A       A       A
          //S S     M S     S M     M M

          if (data[x + 1][y + 1] == "A") {
            if (
              data[x][y] == "M" &&
              data[x + 2][y] == "M" &&
              data[x][y + 2] == "S" &&
              data[x + 2][y + 2] == "S"
            ) {
              answer2++;
            }
            if (
              data[x][y] == "M" &&
              data[x + 2][y] == "S" &&
              data[x][y + 2] == "M" &&
              data[x + 2][y + 2] == "S"
            ) {
              answer2++;
            }
            if (
              data[x][y] == "S" &&
              data[x + 2][y] == "M" &&
              data[x][y + 2] == "S" &&
              data[x + 2][y + 2] == "M"
            ) {
              answer2++;
            }
            if (
              data[x][y] == "S" &&
              data[x + 2][y] == "S" &&
              data[x][y + 2] == "M" &&
              data[x + 2][y + 2] == "M"
            ) {
              answer2++;
            }
          }
        }
      }
    }

    console.log("answer2: " + answer2); //2046
  });
