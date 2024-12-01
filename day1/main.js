fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    let left = [],
      right = [],
      ans1 = 0,
      ans2 = 0;
    textData
      .trim()
      .split("\n")
      .forEach((l) => {
        const [v1, v2] = l.split(/\s+/).map(Number);
        left.push(v1);
        right.push(v2);
      });
    right.sort();
    left.sort().map((l, i) => {
      let c = 0;
      right.map((r) => (l == r ? c++ : null));
      ans1 += Math.abs(l - right[i]);
      ans2 += c * l;
    });
    console.log(ans1); //2066446
    console.log(ans2); //24931009
  });
