let data;
let answer1 = 0;
let answer2 = 0;
let safe = true;
let goBigger = true;
//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    //console.log(textData);

    //in this example we deserialize and convert the textData into an array of numbers
    data = textData.replace(/(\r\n|\n|\r)/gm, "\n").split("\n");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split(" ").map(Number);
    }

    for (let a = 0; a < data.length; a++) {
      if (checkSafe(data[a])) {
        answer1++;
        console.log(data[a]);
      }
    }
    console.log(answer1); //407
    //
    //bruteforce all possible variations on the array
    //
    for (let a = 0; a < data.length; a++) {
      
      let oneSave = false;
      //check all variations of the array
      if (checkSafe(data[a])) {
        oneSave = true;
      }
      
      for (let b = 0; b < data[a].length; b++) 
        {
          //make all possible variations of the array
          
          //copy array
          let tempArray = [...data[a]];
          tempArray.splice(b, 1); 
          if (checkSafe(tempArray)) {
            oneSave = true;
          }

        }

      if (oneSave)
      {
        answer2++;
      }
    }
    console.log(answer2);

  });

function checkSafe(checkThisArray) {
  safe = true;
  goBigger = true;
  if (checkThisArray[1] > checkThisArray[0]) {
    goBigger = true;
  } else {
    goBigger = false;
  }
  for (let j = 0; j < checkThisArray.length; j++) {
    if (j > 0) {
      if (goBigger) {
        if (checkThisArray[j - 1] > checkThisArray[j]) {
          safe = false;
        }
      } else {
        if (checkThisArray[j - 1] < checkThisArray[j]) {
          safe = false;
        }
      }
      if (Math.abs(checkThisArray[j - 1] - checkThisArray[j]) > 3) {
        safe = false;
      }
      if (checkThisArray[j - 1] == checkThisArray[j]) {
        safe = false;
      }
    }
  }
  return safe;
}
