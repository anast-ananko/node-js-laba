String.prototype.plus = function (other) {
  let a = this;
  let b = other;

  let carry = 0;
  let result = [];

  while (a.length < b.length) a = "0" + a;
  while (b.length < a.length) b = "0" + b;

  for (let i = a.length - 1; i >= 0; i--) {
    let digitA = parseInt(a[i] || "0", 10);
    let digitB = parseInt(b[i] || "0", 10);
    let sum = digitA + digitB + carry;
    carry = Math.floor(sum / 10);
    result.push(sum % 10);
  }

  if (carry > 0) result.push(carry);

  return result.reverse().join("");
};

console.log("33".plus("66"));
console.log("1".plus("999"));
console.log("100".plus("5"));
