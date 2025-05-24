String.prototype.multiply = function (other) {
  let a = this;
  let b = other;

  const result = Array(a.length + b.length).fill(0);

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      let digitA = parseInt(a[i], 10);
      let digitB = parseInt(b[j], 10);
      const mul = digitA * digitB;
      const p1 = i + j;
      const p2 = i + j + 1;
      const sum = mul + result[p2];

      result[p2] = sum % 10;
      result[p1] += Math.floor(sum / 10);
    }
  }

  while (result.length > 1 && result[0] === 0) result.shift();

  return result.join("");
};

console.log("----Multiplication----");
console.log("33".multiply("3"));
console.log("128".multiply("8"));
console.log("100".multiply("10"));
console.log("----------------------");
