let answer1 = 0;
let answer2 = 0;
let data = [];
/* structure

[
{stepX: 94, stepY: 34, targetX: 8400, targetY: 5400},
...
]

*/

//fetch("data.txt")
fetch("data_simple.txt")
  .then((response) => response.text())
  .then((textData) => {
    data = textData.split("\r\n");
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split("");
    }   
    console.log(data);
  });
