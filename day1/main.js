fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    let array1 = [],
      array2 = [],
      answer1 = 0,
      answer2 = 0;
    textData
      .trim()
      .split("\n")
      .forEach((line) => {
        const [val1, val2] = line.split(/\s+/).map(Number);
        array1.push(val1);
        array2.push(val2);
      });
    array2.sort();
    array1.sort().map((x, index) => {
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
