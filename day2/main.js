let data;
let answer1 = 0;
let answer2 = 0;
let safe = true;
//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    data = textData.replace(/(\r\n|\n|\r)/gm, "\n").split("\n");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split(" ").map(Number);
      if (checkSafe(data[i])) answer1++;
    }
    console.log(answer1); //407

    //bruteforce all possible variations on the array
    for (let a = 0; a < data.length; a++) {
      let oneSave = false;
      if (checkSafe(data[a])) oneSave = true;
      for (let b = 0; b < data[a].length; b++) {
        let tempArray = [...data[a]];
        tempArray.splice(b, 1);
        if (checkSafe(tempArray)) {
          oneSave = true;
        }
      }
      if (oneSave) answer2++;
    }
    console.log(answer2); //459
  });

function checkSafe(checkThisArray) {
  safe = true;
  if (!([...checkThisArray].sort(function(a, b){return a-b}).toString() == [...checkThisArray].toString() ||
  [...checkThisArray].sort(function(a, b){return a-b}).reverse().toString() == [...checkThisArray].toString() 
))
{
  safe = false;
}

  for (let j = 1; j < checkThisArray.length; j++) {
    if (
      Math.abs(checkThisArray[j - 1] - checkThisArray[j]) > 3 ||
      checkThisArray[j - 1] == checkThisArray[j]
    ) {
      safe = false;
    }
  }
  return safe;
}
