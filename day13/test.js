let answer1 = 0;
let answer2 = 0;
let data = [];
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
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        let temp = isPossible(data[i].targetX, data[i].AstepX, data[i].BstepX) 
        console.log(temp);
    }

}); 

function isPossible(target, number1, number2) {
    /**
     * Helper function to calculate the GCD of two numbers using the Euclidean Algorithm.
     * Returns the GCD of a and b.
     */
    //console.log(target, number1, number2);

    const gcd = (a, b) => {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Calculate the GCD of number1 and number2
    const divisor = gcd(number1, number2);

    // Check if the target is divisible by the GCD
    return target % divisor === 0;
}
