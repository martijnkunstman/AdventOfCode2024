let answer1 = 0;
let answer2 = 0;
let stringData = [];

fetch("data.txt")
//fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    stringData = textData.split("");
    //console.log(stringData);
    let replace = false;
    for (let i = 0; i < stringData.length; i++) {
      if (replace) {
        replace = false;
        let temp = "";
        for (let j = 0; j < Number(stringData[i]); j++) {
          temp = temp + ".";
        }
        stringData[i] = temp;
      } else {
        replace = true;
      }
    }

    stringData = stringData.join("");
    stringData = stringData.split("");
    replace = true;

    //console.log(stringData);

    let number = 0;
    for (let i = 0; i < stringData.length; i++) {
      if (stringData[i] != ".") {
        let temp = [];
        for (let j = 0; j < Number(stringData[i]); j++) {
          temp.push(number);
        }
        stringData[i] = temp;
        number++;
      } else {
        stringData[i] = ["."];
      }
    }

    //
    stringData = stringData.flat();
    //console.log(stringData);
    //

    let lastIndex = stringData.length - 1;
    for (let i = 0; i < stringData.length; i++) {
      if (stringData[i] == "." && i < lastIndex) {
        let found = false;
        do {
          if (stringData[lastIndex] == ".") {
            lastIndex--;
          } else {
            stringData[i] = stringData[lastIndex];
            stringData[lastIndex] = ".";
            lastIndex--;
            found = true;
          }
        } while (!found);
      }
    }
    //console.log(stringData);
    //
    for (let i = 0; i < stringData.length; i++) {
      if (stringData[i] == ".") {
        break;
      } else {
        answer1 = answer1+(i*stringData[i]);
      }
    }
    console.log(answer1);
  });
