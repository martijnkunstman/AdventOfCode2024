let data;
let answer1 = 0;
let answer2 = 0;
fetch("data.txt")
  .then((response) => response.text())
  .then((textData) => {
    console.log(textData);

    //in this example we deserialize and convert the textData into an array of numbers
    data = textData
      .replace(/(\r\n|\n|\r)/gm, "\n")
      .split("\n")
      .map((value) => Number(value));
    console.log(data);
  });


function part1() {
  // your code here
  document.getElementById("solution_part_1").innerHTML = answer1;
} 

function part2() {
  // your code here
  document.getElementById("solution_part_2").innerHTML = answer2;
}

part1();
part2();