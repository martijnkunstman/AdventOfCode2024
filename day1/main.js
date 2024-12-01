fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    let left = [],
      right = [],
      answer1 = 0,
      answer2 = 0;
    textData
      .trim()
      .split("\n")
      .forEach((line) => {
        const [val1, val2] = line.split(/\s+/).map(Number);
        left.push(val1);
        right.push(val2);
      });
      right.sort();
    left.sort().map((l, i) => {
      let count = 0;
      right.map((r) => {
        l == r ? count++ : null;
      });
      answer1 += Math.abs(l - right[i]);
      answer2 += count * l;
    });
    console.log(answer1); //2066446
    console.log(answer2); //24931009
  });
