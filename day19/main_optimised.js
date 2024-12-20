// background info: https://en.wikipedia.org/wiki/Trie
// build structure (key value pair object) to store parts
// iterate over the string to find parts
//
// parts are only 5: r, b, g, u, w 
//


let answer1 = 0;
let answer2 = 0;
let stringsToFindArray = [];
let partsTrie = {};

fetch("data.txt")
  // fetch("data_test.txt")
  .then((response) => response.text())
  .then((textData) => {
    const lines = textData.split("\r\n");
    const partsToUseArray = lines[0].split(", ");
    stringsToFindArray = lines.slice(2);

    buildTrie(partsToUseArray);

    console.log("partsTrie:");
    console.log(partsTrie);
    console.log(stringsToFindArray);

    for (let i = 0; i < stringsToFindArray.length; i++) {
      console.log("run:" + i);
      solveString(stringsToFindArray[i]);
    }

    console.log("answer1:" + answer1);
    console.log("answer2:" + answer2);
  });

function buildTrie(parts) {
  parts.forEach((part) => {
    let node = partsTrie;
    for (const char of part) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.isEnd = true; // is end
  });
}

function findPartsInTrie(stringToCheck, start = 0) {
  const partsFound = [];
  let node = partsTrie;

  for (let i = start; i < stringToCheck.length; i++) {
    const char = stringToCheck[i];
    if (!node[char]) break;
    node = node[char];
    if (node.isEnd) partsFound.push(stringToCheck.slice(start, i + 1));
  }

  return partsFound;
}

const memo = {};

function countCombinations(stringToCheck) {
  if (stringToCheck.length === 0) {
    return 1; // One valid way to split the string
  }

  if (memo[stringToCheck] !== undefined) {
    return memo[stringToCheck];
  }

  const partsToUse = findPartsInTrie(stringToCheck);
  let totalCombinations = 0;

  for (const part of partsToUse) {
    totalCombinations += countCombinations(stringToCheck.slice(part.length));
  }

  memo[stringToCheck] = totalCombinations;
  return totalCombinations;
}

function solveString(stringToCheck) {
  const combinations = countCombinations(stringToCheck);

  if (combinations > 0) {
    answer1++; // Increment for strings that can be split
    answer2 += combinations; // Add all possible combinations
  }
}
