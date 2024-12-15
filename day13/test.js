let answer1 = 0;
let answer2 = 0;
let data = [];

let isoptelossen = [];
let isoptelossen2 = [];

let isnietoptelossen = [];
let isnietoptelossen2 = [];

let totaaloptelossen = 0;

fetch("data.txt")
//fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    let temp = textData.split("\r\n");
    for (let i = 0; i < temp.length; i++) {
      temp[i] = temp[i].split(" ").map((x) => x.replace(/\D/g, ""));
    }
    //console.log(temp);
    let extra = 10000000000000;
    //let extra = 0;
    for (i = 0; i < temp.length; i += 4) {
      data.push({
        AstepX: parseInt(temp[i][2]),
        AstepY: parseInt(temp[i][3]),
        BstepX: parseInt(temp[i + 1][2]),
        BstepY: parseInt(temp[i + 1][3]),
        targetX: parseInt(temp[i + 2][1]) + extra,
        targetY: parseInt(temp[i + 2][2]) + extra,
      });
    }
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      // solve(
      //   data[i].AstepX,
      //   data[i].AstepY,
      //   data[i].BstepX,
      //   data[i].BstepY,
      //   data[i].targetX,
      //   data[i].targetY,
      //   i
      // );
      // solve2(
      //   data[i].targetX,
      //   data[i].AstepX,
      //   data[i].BstepX,
      //   data[i].targetY,
      //   data[i].AstepY,
      //   data[i].BstepY
      // );
      solve3(
        data[i].targetX,
        data[i].AstepX,
        data[i].BstepX,
        data[i].targetY,
        data[i].AstepY,
        data[i].BstepY
      );
      console.log("answer2", answer2);
    }

    //solve with gcd
    for (let i = 0; i < data.length; i++) {
      let xsolve = solve2(data[i].targetX, data[i].AstepX, data[i].BstepX);
      let ysolve = solve2(data[i].targetY, data[i].AstepY, data[i].BstepY);
      if (xsolve && ysolve) {
        isoptelossen2.push(i);
      } else {
        isnietoptelossen2.push(i);
      }
    }

    console.log("isnietoptelossen", isnietoptelossen);
    console.log("isnietoptelossen2", isnietoptelossen2);
    console.log("totaaloptelossen", totaaloptelossen);
  });

  function solve3(targetX, AstepX, BstepX, targetY, AstepY, BstepY) {

    //solve using cramers rule
    let determinant = AstepX * BstepY - AstepY * BstepX;
    let determinantX = targetX * BstepY - targetY * BstepX;
    let determinantY = AstepX * targetY - AstepY * targetX;
    let x = determinantX / determinant;
    let y = determinantY / determinant;
    if (determinant !== 0) {
      //console.log("is mogelijk op te lossen");
      //check if x and y are integers
      if (Number.isInteger(x) && Number.isInteger(y)) {
        answer2 += x*3 + y;   
      }  
      return true;
    } else {
      //console.log("is niet op te lossen");
      return false;
    }

  }

function solve(AX, AY, BX, BY, TX, TY, i) {
  //met welke knop ben ik het goedkoopste bij de target....
  let aantalAx = Math.floor(TX / AX);
  let aantalAy = Math.floor(TY / AY);
  let aantalBx = Math.floor(TX / (BX * 3));
  let aantalBy = Math.floor(TY / (BY * 3));
  let kliks = [aantalAx, aantalAy, aantalBx, aantalBy];
  let difference = 0;
  let knopMeesteKlikken;
  totaaloptelossen++;

  //welke knop is het meeste klikken? Die wil je niet het meeste gebruiken.....
  if (kliks[0] > kliks[1] && kliks[0] > kliks[2] && kliks[0] > kliks[3]) {
    knopMeesteKlikken = "B";
  }
  if (kliks[1] > kliks[0] && kliks[1] > kliks[2] && kliks[1] > kliks[3]) {
    knopMeesteKlikken = "B";
  }
  if (kliks[2] > kliks[0] && kliks[2] > kliks[1] && kliks[2] > kliks[3]) {
    knopMeesteKlikken = "A";
  }
  if (kliks[3] > kliks[0] && kliks[3] > kliks[1] && kliks[3] > kliks[2]) {
    knopMeesteKlikken = "A";
  }

  if (knopMeesteKlikken === "A") {
    //wat is het verschil tussen X en Y?
    difference = aantalAx - aantalAy;
    //kan ik dat goedmaken met de andere knop?
    if (difference < 0) {
      //ik heb meer Y nodig dan X
      if (AY < BY) {
        console.log("is mogelijk op te lossen");
        isoptelossen.push(i);
      } else {
        console.log("is niet op te lossen");
        isnietoptelossen.push(i);
      }
    } else {
      //ik heb meer X nodig dan Y
      if (AX < BX) {
        console.log("is mogelijk op te lossen");
        isoptelossen.push(i);
      } else {
        console.log("is niet op te lossen");
        isnietoptelossen.push(i);
      }
    }
  }

  if (knopMeesteKlikken === "B") {
    //wat is het verschil tussen X en Y?
    difference = aantalBx - aantalBy;
    if (difference < 0) {
      //ik heb meer Y nodig dan X
      if (BY < AY) {
        console.log("is mogelijk op te lossen");
        isoptelossen.push(i);
      } else {
        console.log("is niet op te lossen");
        isnietoptelossen.push(i);
      }
    } else {
      //ik heb meer X nodig dan Y
      if (BX < AX) {
        console.log("is mogelijk op te lossen");
        isoptelossen.push(i);
      } else {
        console.log("is niet op te lossen");
        isnietoptelossen.push(i);
      }
    }
  }

  console.log("aantalAx", aantalAx);
  console.log("aantalAy", aantalAy);
  console.log("aantalBx", aantalBx);
  console.log("aantalBy", aantalBy);
  console.log("knopMeesteKlikken", knopMeesteKlikken);
  console.log("difference", difference);
  console.log("-----------------");
}

function solve2(target, number1, number2) {
  let gcd = greatestCommonDivisor(number1, number2);
  let remainder = target % gcd;
  if (remainder === 0) {
    //console.log("is mogelijk op te lossen");
    return true;
  } else {
    //console.log("is niet op te lossen");
    return false;
  }
}

function greatestCommonDivisor(a, b) {
  if (b == 0) {
    return a;
  }
  return greatestCommonDivisor(b, a % b);
}
