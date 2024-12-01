fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    let array1 = [],
      array2 = [],
      answer1 = 0,
      answer2 = 0;
    textData
      .replace(/(\r\n|\n|\r)/gm, "\n")
      .split("\n")
      .map((x) => {
        array1.push(Number(x.split("   ")[0]));
        array2.push(Number(x.split("   ")[1]));
      });
    array1.sort();
    array2.sort();
    array1.map((x, index) => {
      let count = 0;
      array2.map((y) => {
        x == y ? count++ : null;
      });
      answer2 += count * x;
      answer1 += Math.abs(x - array2[index]);
    });
    console.log(answer1); //2066446
    console.log(answer2); //24931009
  });
