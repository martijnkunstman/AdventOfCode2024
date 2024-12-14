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

    currentTime = performance.timeOrigin + performance.now();
    for (let i = 0; i < data.length; i++) {
      //minimal A presses
      answer1 = answer1 + solve(data[i]);
    }
    duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);

    //test data = 480
    //answer1 = 28887
    console.log("Answer 1: " + answer1);

    //part 2

    //add extra data
    currentTime = performance.timeOrigin + performance.now();
    for (let i = 0; i < data.length; i++) {
      //minimal A presses
      answer2 = answer2 + solve2(data[i]);
    }
    duration = performance.timeOrigin + performance.now() - currentTime;
    console.log("duration: " + duration);

    //test data = 480
    console.log("Answer 2: " + answer2);
  });

function solve2(data) {
  let tokens = 0;
  let AX = Number(data.AstepX);
  let AY = Number(data.AstepY);
  let BX = Number(data.BstepX);
  let BY = Number(data.BstepY);
  let targetX = Number(data.targetX)*1;
  let targetY = Number(data.targetY)*1;
  let apressMinX = Math.floor(targetX / AX);
  let depth = 10000;
  if (apressMinX > depth) {
    apressMinX = depth;
  } 
  let apressMinY = Math.floor(targetY / AY);
  if (apressMinY > depth) {
    apressMinY = depth;
  }
  let apressMin = Math.min(apressMinX, apressMinY);
  for (let apress = apressMin; apress > -1; apress--) {
    let bpressMinX = Math.floor((targetX - AX * apress) / BX);  
    for (let bpress = bpressMinX; bpress < depth*2-apress; bpress++) {
      let targetXnow = 0;
      let targetYnow = 0;
      targetXnow += AX * apress;
      targetXnow += BX * bpress;
      if (targetXnow == targetX) {
        targetYnow += AY * apress;
        targetYnow += BY * bpress;
        if (targetYnow == targetY) {
          tokens = apress * 3 + bpress;
          //console.log("apress: " + apress + " bpress: " + bpress);
          return tokens;
        }
      }
    }
  }

  return tokens;
}

function solve(data) {
  let tokens = 0;
  let AX = Number(data.AstepX);
  let AY = Number(data.AstepY);
  let BX = Number(data.BstepX);
  let BY = Number(data.BstepY);
  let targetX = Number(data.targetX);
  let targetY = Number(data.targetY);
  targetX = targetX;
  targetY = targetY;

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
          //console.log("apress: " + apress + " bpress: " + bpress);
          return tokens;
        }
      }
    }
  }

  return tokens;
}
