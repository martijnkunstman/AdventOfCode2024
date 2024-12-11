let answer1 = 0;
let answer2 = 0;
let stones = [];

fetch("data.txt")
//fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    console.log(textData);
    stones = textData.split(" ");
    console.log("stones:");
    console.log(stones);

    //
    //rules: 0 becomes 1
    //evendigits: becomes two stones (spit in half, 00 -> 0)
    //not 0 and not even digits times 2024
    //

    //25 times

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < stones.length; j++) {
        if (stones[j] == "0") {
          //rule 1
          stones[j] = "1";
        } else if (stones[j].toString().length % 2 == 0) {
          //rule 2
          const partOne = stones[j]
            .toString()
            .slice(0, stones[j].toString().length / 2);
          let partTwo = stones[j]
            .toString()
            .slice(
              stones[j].toString().length / 2,
              stones[j].toString().length
            );
          while (partTwo.split("")[0] == 0) {
            partTwo = partTwo.split("").slice(1, partTwo.length).join("");
          }
          if (partTwo == "") {
            partTwo = "0";
          }
          stones[j]=[partOne, partTwo];
        } else {
          let bigNumber = BigInt(stones[j]);
          bigNumber = bigNumber * 2024n;
          stones[j] = bigNumber.toString();
        }
      }
      stones = stones.flat();
      console.log("stones:");
      console.log(stones);
    }
    console.log("answer1:");
    console.log(stones.length);
  });
