let answer1 = 0;
let answer2 = 0;
let pageOrderingRules = [];
let pagesToProduceLists = [];

let pagesToOrderLists = [];

//all the pages are two digigts long, there are no zeros in the pages
//there is a rule for all the pages after this page (so no need to check last)
//check if no rule is violated

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
      let allRulesFound = true;
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

    //make part 1
    for (let i = 0; i < pagesToProduceLists.length; i++) {
      checkListToProduce(pagesToProduceLists[i]);
    }

    //make part 2
    for (let i = 0; i < pagesToOrderLists.length; i++) {
      checkListToOrder(pagesToOrderLists[i]);
    }

    console.log("answer1: " + answer1); //5651 ok!
    console.log("answer2: " + answer2); //4743 ok!
  });
