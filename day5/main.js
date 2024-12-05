let answer1 = 0;
let answer2 = 0;
let pageOrderingRules = [];
let pagesToProduceLists = [];

let pagesToOrderLists = [];

//all the pages are two digts long, there are no zeros in the pages
//part 1: check if:
//there is a rule for all the pages after this page (so no need to check last)
//check if no rule is violated ? (appereantly this is not needed)

//fetch("data_simple.txt")
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    textData = textData.split("\r\n");

    let firstpart = true;

    for (let i = 0; i < textData.length; i++) {
      if (textData[i] == "") {
        firstpart = false;
      } else {
        if (firstpart) {
          pageOrderingRules.push(textData[i].split("|").map(Number));
        } else {
          pagesToProduceLists.push(textData[i].split(",").map(Number));
        }
      }
    }

    function checkIfThisRuleExists(rule) {
      let exists = false;
      for (let i = 0; i < pageOrderingRules.length; i++) {
        if (pageOrderingRules[i][0] + "" + pageOrderingRules[i][1] == rule) {
          exists = true;
          break;
        }
      }
      return exists;
    }

    function checkListToProduce(list) {
      let result = true;
      //check if all rules for this exist
      for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
          ruleToCheck = list[i] + "" + list[j];
          if (!checkIfThisRuleExists(ruleToCheck)) {
            result = false;
            break;
          }
        }
      }
      if (result) {
        answer1 += getMiddleValue(list);
      } else {
        pagesToOrderLists.push(list);
      }
      return result;
    }

    function checkListToOrder(list) {
      //order this list so it is correct

      //go through all the pages in the list and check if there is a rule to place it before a page that is in front of it...
      for (let i = 1; i < list.length; i++) {
        let checkThisNumber = list[i];
        //check if this number is in front of the number before it based on the rules
        for (let j = i - 1; j >= 0; j--) {
          let checkIfThisNumberIsBehind = list[j];
          if (
            checkIfThisRuleExists(
              checkThisNumber + "" + checkIfThisNumberIsBehind
            )
          ) {
            let temp = list[j];
            list[j] = list[i];
            list[i] = temp;
            i = j;
          }
        }
      }

      answer2 += getMiddleValue(list);
    }

    function getMiddleValue(list) {
      return list[Math.floor(list.length / 2)];
    }

    let currentTime = performance.timeOrigin + performance.now();

    //make part 1
    for (let i = 0; i < pagesToProduceLists.length; i++) {
      checkListToProduce(pagesToProduceLists[i]);
    }

    //make part 2
    for (let i = 0; i < pagesToOrderLists.length; i++) {
      checkListToOrder(pagesToOrderLists[i]);
    }

    console.log(
      "duration:" + (performance.timeOrigin + performance.now() - currentTime)
    );

    console.log("answer1: " + answer1); //5651 ok!
    console.log("answer2: " + answer2); //4743 ok!

    //--------------------------------------------------------------------------------
    // now do it again with a Uint16Array
    //--------------------------------------------------------------------------------

    firstpart = false;
    let pageOrderingRules8 = new Uint16Array(pageOrderingRules.length);
    let pagesToProduceLists8 = [];
    let pagesToOrderLists8 = [];

    function checkIfThisRuleExists8(rule) {
      let exists = false;
      for (let i = 0; i < pageOrderingRules8.length; i++) {
        if (pageOrderingRules8[i] === rule) {
          exists = true;
          break;
        }
      }
      return exists;
    }

    function checkListToProduce8(list) {
      let result = true;
      //check if all rules for this exist
      for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
          ruleToCheck = Number(list[i] + "" + list[j]);
          if (!checkIfThisRuleExists8(ruleToCheck)) {
            result = false;
            break;
          }
        }
      }
      if (result) {
        answer1 += getMiddleValue(list);
      } else {
        pagesToOrderLists8.push(list);
      }
      return result;
    }

    function checkListToOrder8(list) {
      //order this list so it is correct

      //go through all the pages in the list and check if there is a rule to place it before a page that is in front of it...
      for (let i = 1; i < list.length; i++) {
        let checkThisNumber = list[i];
        //check if this number is in front of the number before it based on the rules
        for (let j = i - 1; j >= 0; j--) {
          let checkIfThisNumberIsBehind = list[j];
          if (
            checkIfThisRuleExists8(
              Number(checkThisNumber + "" + checkIfThisNumberIsBehind)
            )
          ) {
            let temp = list[j];
            list[j] = list[i];
            list[i] = temp;
            i = j;
          }
        }
      }

      answer2 += getMiddleValue(list);
    }

    firstpart = true;
    let count = 0;
    for (let i = 0; i < textData.length; i++) {
      if (textData[i] == "") {
        firstpart = false;
      } else {
        if (firstpart) {
          let temp = Number(textData[i].split("|").join(""));
          pageOrderingRules8[count] = temp;
          count++
        } else {
          let tempArray = textData[i].split(",");
          let temp = new Uint16Array(tempArray.length);
          for (let j = 0; j < tempArray.length; j++) {
            temp[j] = tempArray[j];
          }
          pagesToProduceLists8.push(temp);
        }
      }
    }

    answer1 = 0;
    answer2 = 0;

    //console.log(pageOrderingRules8);

    currentTime = performance.timeOrigin + performance.now();

    //make part 1
    for (let i = 0; i < pagesToProduceLists8.length; i++) {
      checkListToProduce8(pagesToProduceLists8[i]);
    }

    //make part 2
    for (let i = 0; i < pagesToOrderLists8.length; i++) {
      checkListToOrder8(pagesToOrderLists8[i]);
    }

    console.log(
      "duration:" + (performance.timeOrigin + performance.now() - currentTime)
    );

    console.log("answer1: " + answer1); //5651 ok!
    console.log("answer2: " + answer2); //4743 ok!
  });
