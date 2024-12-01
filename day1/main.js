fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    let array1 = [];
    let array2 = [];
    let answer1 = 0;
    let answer2 = 0;
    textData.replace(/(\r\n|\n|\r)/gm, "\n").split("\n").map((x) => {
      array1.push(Number(x.split("   ")[0]));
      array2.push(Number(x.split("   ")[1]));
    });
    //part 1
    array1.sort();
    array2.sort();
    for (i = 0; i < array1.length; i++) {
      answer1 += Math.abs(array1[i] - array2[i]);
    }
    console.log(answer1);
    //part 2
    for (a = 0; a < array1.length; a++) {
      let count = 0;
      for (b = 0; b < array2.length; b++) {
        if (array2[b] === array1[a]) {
          count++;
          //optimise by removing the element from the array...
        }
      }
      answer2 += count * array1[a];
    }
    console.log(answer2);
  });
