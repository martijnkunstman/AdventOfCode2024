let answer1 = BigInt(0);
let answer2 = BigInt(0);
let data;

// data = [[find, [numbers]],...];

//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    data = textData.split("\r\n");
    for (let i = 0; i < data.length; i++) {
      let temp = [];
      temp[0] = BigInt(data[i].split(": ")[0]);
      temp[1] = data[i].split(": ")[1].split(" ");
      const temp2 = new BigUint64Array(temp[1].length);
      for (let j = 0; j < temp[1].length; j++) {
        temp2[j] = BigInt(temp[1][j]);
      }
      temp[1] = temp2;
      data[i] = temp;
    }

    //console.log("data:");
    //console.log(data);

    for (let i = 0; i < data.length; i++) {
      console.log("part1:");
      answer1 = answer1 + findIfPossible(data[i],1);
    }
    //console.log("sequences to check:" + data.length);
    //console.log(data);

    //create new sequences to check with all the possible | operators

    for (let i = 0; i < data.length; i++) {
      console.log("part2:");
      answer2 = answer2 + findIfPossible(data[i],2);
    }

    function findIfPossible(checkThis, part) {
      let findThisNumber = BigInt(checkThis[0]);
      let useTheseNumbers = checkThis[1];
      let useThisManyNumbers = useTheseNumbers.length;

      // console.log("findThisNumber:");
      // console.log(findThisNumber);
      // console.log("useTheseNumbers:" );
      // console.log(useTheseNumbers);
      // console.log("useThisManyNumbers:" + useThisManyNumbers);

      let operators;
      if (part == 1) {
        operators = generateSequences(["+", "*"], useThisManyNumbers - 1);
      } else {
        operators = generateSequences(["+", "*", "|"], useThisManyNumbers - 1);
      }
      // console.log(operators);

      for (let i = 0; i < operators.length; i++) {
        let temp = BigInt(useTheseNumbers[0]);
        for (let j = 0; j < operators[i].length; j++) {
          if (operators[i][j] == "+") {
            temp = temp + useTheseNumbers[j + 1];
          }
          if (operators[i][j] == "*") {
            temp = temp * useTheseNumbers[j + 1];
          }
          if (operators[i][j] == "|") {
            temp = BigInt(temp + "" + useTheseNumbers[j + 1]);
          }
        }
        if (temp == findThisNumber) {
          return checkThis[0];
        }
      }

      return BigInt(0);
    }

    // console.log(data);

    //now i got all the data in a biguint64 array
    //rows are separated by 0
    //first number is the number to find

    console.log("answer1: " + answer1); //3749 2941973819040 ok!!!
    console.log("answer2: " + answer2); //11387   249943041417600
  });

function generateSequences(chars, n) {
  let results = [];
  function helper(currentSequence) {
    if (currentSequence.length === n) {
      results.push(currentSequence);
      return;
    }
    for (let char of chars) {
      helper(currentSequence + char);
    }
  }
  helper("");
  return results;
}
