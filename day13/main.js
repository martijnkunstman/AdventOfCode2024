let answer1 = 0;
let answer2 = 0;
let data = [];
/* structure

[
{AstepX: 94, AstepY: 34, BstepX: 22, BstepY: 67, targetX: 8400, targetY: 5400},
...
]

*/

fetch("data.txt")
//fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    let temp = textData.split("\r\n");
    for (let i = 0; i < temp.length; i++) {
      temp[i] = temp[i].split(" ").map((x) => x.replace(/\D/g, ""));
    }
    console.log(temp);
    for (i = 0; i < temp.length; i += 4) {
      data.push({
        AstepX: parseInt(temp[i][2]),
        AstepY: parseInt(temp[i][3]),
        BstepX: parseInt(temp[i + 1][2]),
        BstepY: parseInt(temp[i + 1][3]),
        targetX: parseInt(temp[i + 2][1]),
        targetY: parseInt(temp[i + 2][2]),
      });
    }

    for (let i = 0; i < data.length; i++) {
      //minimal A presses
      answer1 = answer1 + solve(data[i]);
    }

    //test data = 480
    console.log("Answer 1: " + answer1);
  });

function solve(data) {
  console.log(data);
  let tokens = 0;
  let AX = Number(data.AstepX);
  let AY = Number(data.AstepY);
  let BX = Number(data.BstepX);
  let BY = Number(data.BstepY);
  let targetX = Number(data.targetX);
  let targetY = Number(data.targetY);

  for (let apress = 0; apress < 100; apress++) {
    for (let bpress = 0; bpress < 100; bpress++) {
      let targetXnow = 0;
      let targetYnow = 0;
      targetXnow += AX * apress;
      targetXnow += BX * bpress;
      if (targetXnow == targetX) {
        targetYnow += AY * apress;
        targetYnow += BY * bpress;
        if (targetYnow == targetY) {
          tokens = apress * 3 + bpress;
          return tokens;
        }
      }
    }
  }

  return tokens;
}
