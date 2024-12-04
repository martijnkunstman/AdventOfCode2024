//to do to optimise...

//convert letters to numbers and use Uint8Array

/*

    X -> 1
    M -> 2
    A -> 4
    S -> 8

    */

//nest ifs and make them simpler
//use continues and breaks

let answer1 = 0;
let answer2 = 0;
let data;
let dataUint;
let length;
//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    data = textData.split("\r\n");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split("");
    }

    length = data.length;

    /*
    //twp dimensional array
    dataUint = new Array(length);
    for (let i = 0; i < length; i++) {
      dataUint[i] = new Uint8Array(length);
      for (let j = 0; j < length; j++) {
        if (data[i][j] == "X") dataUint[i][j] = 1;
        if (data[i][j] == "M") dataUint[i][j] = 2;
        if (data[i][j] == "A") dataUint[i][j] = 4;
        if (data[i][j] == "S") dataUint[i][j] = 8;
      }
    }
    */

    //one dimensional array
    dataUint = new Uint16Array(length * length);
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const idx = j * length + i;
        if (i > length - 1 || j > length - 1) {
          dataUint[idx] = 0;
        } else {
          if (data[i][j] == "X") dataUint[idx] = 1;
          if (data[i][j] == "M") dataUint[idx] = 10;
          if (data[i][j] == "A") dataUint[idx] = 100;
          if (data[i][j] == "S") dataUint[idx] = 1000;
        }
      }
    }
    //-------------------
    let currentTime = performance.timeOrigin + performance.now();
    useUint8Array();
    console.log("-useUintArray array-");
    console.log(
      "duration:" + (performance.timeOrigin + performance.now() - currentTime)
    );
    console.log("answer1: " + answer1 + " should be: 2718"); //2718
    console.log("answer2: " + answer2 + " should be: 2046"); //2046
    //-------------------
    answer1 = 0;
    answer2 = 0;
    currentTime = performance.timeOrigin + performance.now();
    useNormalArray();
    console.log("-normal array-");
    console.log(
      "duration:" + (performance.timeOrigin + performance.now() - currentTime)
    );
    console.log("answer1: " + answer1 + " should be: 2718"); //2718
    console.log("answer2: " + answer2 + " should be: 2046"); //2046
  });

//---------------------------------

function useNormalArray() {
  for (y = 0; y < length; y++) {
    for (x = 0; x < length; x++) {
      //part 1

      //horizontal -
      let hor, ver, dia1, dia2;
      if (x < length - 3) {
        hor = data[x][y] + data[x + 1][y] + data[x + 2][y] + data[x + 3][y];
      }
      //vertical |
      if (y < length - 3) {
        ver = data[x][y] + data[x][y + 1] + data[x][y + 2] + data[x][y + 3];
      }
      //diagonal1 \
      if (x < length - 3 && y < length - 3) {
        dia1 =
          data[x][y] +
          data[x + 1][y + 1] +
          data[x + 2][y + 2] +
          data[x + 3][y + 3];
      }
      //diagonal2 /
      if (x > 2 && y < length - 3) {
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

      //part 2

      if (x < length - 2 && y < length - 2) {
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
}

//---------------------------------

//correct answer is 1*1 + 10*2 + 100*3 + 1000*4 = 4321
//correct answer is 1000*1 + 100*2 + 20*3 + 1*4 = 1234

function useUint8Array() {
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      const idx = y * length + x; // 1D index for (x, y)

      if (x < length - 3) {
        if (dataUint[idx] == 1) {
          if (dataUint[idx + 1] == 10) {
            if (dataUint[idx + 2] == 100) {
              if (dataUint[idx + 3] == 1000) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[idx] == 1000) {
          if (dataUint[idx + 1] == 100) {
            if (dataUint[idx + 2] == 10) {
              if (dataUint[idx + 3] == 1) {
                answer1++;
              }
            }
          }
        }
      }

      if (y < length - 3) {
        if (dataUint[idx] == 1) {
          if (dataUint[idx + length] == 10) {
            if (dataUint[idx + 2 * length] == 100) {
              if (dataUint[idx + 3 * length] == 1000) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[idx] == 1000) {
          if (dataUint[idx + length] == 100) {
            if (dataUint[idx + 2 * length] == 10) {
              if (dataUint[idx + 3 * length] == 1) {
                answer1++;
              }
            }
          }
        }
      }

      if (x < length - 3 && y < length - 3) {
        if (dataUint[idx] == 1) {
          if (dataUint[idx + length + 1] == 10) {
            if (dataUint[idx + 2 * (length + 1)] == 100) {
              if (dataUint[idx + 3 * (length + 1)] == 1000) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[idx] == 1000) {
          if (dataUint[idx + length + 1] == 100) {
            if (dataUint[idx + 2 * (length + 1)] == 10) {
              if (dataUint[idx + 3 * (length + 1)] == 1) {
                answer1++;
              }
            }
          }
        }
      }

      if (x > 2 && y < length - 3) {
        if (dataUint[idx] == 1) {
          if (dataUint[idx + length - 1] == 10) {
            if (dataUint[idx + 2 * (length - 1)] == 100) {
              if (dataUint[idx + 3 * (length - 1)] == 1000) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[idx] == 1000) {
          if (dataUint[idx + length - 1] == 100) {
            if (dataUint[idx + 2 * (length - 1)] == 10) {
              if (dataUint[idx + 3 * (length - 1)] == 1) {
                answer1++;
              }
            }
          }
        }
      }

      /*
      // Horizontal -
      if (x < length - 3) {
        if (
          dataUint[idx] +
            dataUint[idx + 1] * 2 +
            dataUint[idx + 2] * 3 +
            dataUint[idx + 3] * 4 ==
          4321
        ) {
          answer1++;
        }
        if (
          dataUint[idx] * 4 +
            dataUint[idx + 1] * 3 +
            dataUint[idx + 2] * 2 +
            dataUint[idx + 3] ==
          1234
        ) {
          answer1++;
        }
      }

      // Vertical |
      if (y < length - 3) {
        if (
          dataUint[idx] +
            dataUint[idx + length] * 2 +
            dataUint[idx + 2 * length] * 3 +
            dataUint[idx + 3 * length] * 4 ==
          4321
        ) {
          answer1++;
        }
        if (
          dataUint[idx] * 4 +
            dataUint[idx + length] * 3 +
            dataUint[idx + 2 * length] * 2 +
            dataUint[idx + 3 * length] ==
          1234
        ) {
          answer1++;
        }
      }

      // Diagonal \
      if (x < length - 3 && y < length - 3) {
        if (
          dataUint[idx] +
            dataUint[idx + length + 1] * 2 +
            dataUint[idx + 2 * (length + 1)] * 3 +
            dataUint[idx + 3 * (length + 1)] * 4 ==
          4321
        ) {
          answer1++;
        }
        if (
          dataUint[idx] * 4 +
            dataUint[idx + length + 1] * 3 +
            dataUint[idx + 2 * (length + 1)] * 2 +
            dataUint[idx + 3 * (length + 1)] ==
          1234
        ) {
          answer1++;
        }
      }

      // Diagonal /
      if (x > 2 && y < length - 3) {
        if (
          dataUint[idx] +
            dataUint[idx + length - 1] * 2 +
            dataUint[idx + 2 * (length - 1)] * 3 +
            dataUint[idx + 3 * (length - 1)] * 4 ==
          4321
        ) {
          answer1++;
        }
        if (
          dataUint[idx] * 4 +
            dataUint[idx + length - 1] * 3 +
            dataUint[idx + 2 * (length - 1)] * 2 +
            dataUint[idx + 3 * (length - 1)] ==
          1234
        ) {
          answer1++;
        }
      }
        */

      // 3x3 patterns
      if (x < length - 2 && y < length - 2) {
        const centerIdx = idx + length + 1; // Center index of the 3x3 grid
        if (dataUint[centerIdx] == 100) {
          if (
            dataUint[idx] == 10 &&
            dataUint[idx + 2] == 10 &&
            dataUint[idx + 2 * length] == 1000 &&
            dataUint[idx + 2 * length + 2] == 1000
          ) {
            answer2++;
          }
          if (
            dataUint[idx] == 10 &&
            dataUint[idx + 2] == 1000 &&
            dataUint[idx + 2 * length] == 10 &&
            dataUint[idx + 2 * length + 2] == 1000
          ) {
            answer2++;
          }
          if (
            dataUint[idx] == 1000 &&
            dataUint[idx + 2] == 10 &&
            dataUint[idx + 2 * length] == 1000 &&
            dataUint[idx + 2 * length + 2] == 10
          ) {
            answer2++;
          }
          if (
            dataUint[idx] == 1000 &&
            dataUint[idx + 2] == 1000 &&
            dataUint[idx + 2 * length] == 10 &&
            dataUint[idx + 2 * length + 2] == 10
          ) {
            answer2++;
          }
        }
      }
    }
  }
}

/*
-- two dimensional array

function useUint8Array() {
  for (y = 0; y < length; y++) {
    for (x = 0; x < length; x++) {
      //horizontal -
      let hor, ver, dia1, dia2;
      //hor
      if (x < length - 3) {
        if (dataUint[x][y] == 1) {
          if (dataUint[x + 1][y] == 2) {
            if (dataUint[x + 2][y] == 4) {
              if (dataUint[x + 3][y] == 8) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[x][y] == 8) {
          if (dataUint[x + 1][y] == 4) {
            if (dataUint[x + 2][y] == 2) {
              if (dataUint[x + 3][y] == 1) {
                answer1++;
              }
            }
          }
        }
      }
      //ver
      if (y < length - 3) {
        if (dataUint[x][y] == 1) {
          if (dataUint[x][y + 1] == 2) {
            if (dataUint[x][y + 2] == 4) {
              if (dataUint[x][y + 3] == 8) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[x][y] == 8) {
          if (dataUint[x][y + 1] == 4) {
            if (dataUint[x][y + 2] == 2) {
              if (dataUint[x][y + 3] == 1) {
                answer1++;
              }
            }
          }
        }
      }
      //dia1
      if (x < length - 3 && y < length - 3) {
        if (dataUint[x][y] == 1) {
          if (dataUint[x + 1][y + 1] == 2) {
            if (dataUint[x + 2][y + 2] == 4) {
              if (dataUint[x + 3][y + 3] == 8) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[x][y] == 8) {
          if (dataUint[x + 1][y + 1] == 4) {
            if (dataUint[x + 2][y + 2] == 2) {
              if (dataUint[x + 3][y + 3] == 1) {
                answer1++;
              }
            }
          }
        }
      }
      //dia2
      if (x > 2 && y < length - 3) {
        if (dataUint[x][y] == 1) {
          if (dataUint[x - 1][y + 1] == 2) {
            if (dataUint[x - 2][y + 2] == 4) {
              if (dataUint[x - 3][y + 3] == 8) {
                answer1++;
              }
            }
          }
        }
        if (dataUint[x][y] == 8) {
          if (dataUint[x - 1][y + 1] == 4) {
            if (dataUint[x - 2][y + 2] == 2) {
              if (dataUint[x - 3][y + 3] == 1) {
                answer1++;
              }
            }
          }
        }
      }

      if (x < length - 2 && y < length - 2) {
        //M M     M S     S M     S S
        // A       A       A       A
        //S S     M S     S M     M M

        if (dataUint[x + 1][y + 1] == 4) {
          if (
            dataUint[x][y] == 2 &&
            dataUint[x + 2][y] == 2 &&
            dataUint[x][y + 2] == 8 &&
            dataUint[x + 2][y + 2] == 8
          ) {
            answer2++;
          }
          if (
            dataUint[x][y] == 2 &&
            dataUint[x + 2][y] == 8 &&
            dataUint[x][y + 2] == 2 &&
            dataUint[x + 2][y + 2] == 8
          ) {
            answer2++;
          }
          if (
            dataUint[x][y] == 8 &&
            dataUint[x + 2][y] == 2 &&
            dataUint[x][y + 2] == 8 &&
            dataUint[x + 2][y + 2] == 2
          ) {
            answer2++;
          }
          if (
            dataUint[x][y] == 8 &&
            dataUint[x + 2][y] == 8 &&
            dataUint[x][y + 2] == 2 &&
            dataUint[x + 2][y + 2] == 2
          ) {
            answer2++;
          }
        }
      }
    }
  }
}
  */
