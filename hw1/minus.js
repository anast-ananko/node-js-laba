String.prototype.minus = function (other) {
  let a = this;
  let b = other;

  let borrow = 0;
  let result = [];

  while (a.length < b.length) a = "0" + a;
  while (b.length < a.length) b = "0" + b;

  for (let i = a.length - 1; i >= 0; i--) {
    let digitA = parseInt(a[i], 10) - borrow;
    let digitB = parseInt(b[i], 10);

    if (digitA < digitB) {
      digitA += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result.push(digitA - digitB);
  }

  while (result.length > 1 && result[result.length - 1] === 0) {
    result.pop();
  }

  return result.reverse().join("");
};

console.log("99".minus("33"));
console.log("100".minus("1"));
console.log("20".minus("5"));
