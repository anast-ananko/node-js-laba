import "./minus.js";

String.prototype.divide = function (other) {
  let dividend = this;
  let divisor = other;

  if (divisor === "0") throw new Error("Division by zero");

  let current = "";
  let result = "";

  for (let i = 0; i < dividend.length; i++) {
    current += dividend[i];
    current = current.replace(/^0+/, "") || "0";

    let count = 0;
    while (compare(current, divisor) >= 0) {
      current = current.minus(divisor);
      count++;
    }

    result += count.toString();
  }

  return result.replace(/^0+/, "") || "0";
};

function compare(a, b) {
  a = a.replace(/^0+/, "") || "0";
  b = b.replace(/^0+/, "") || "0";

  if (a.length !== b.length) return a.length - b.length;
  return a.localeCompare(b);
}

console.log("-------Division-------");
console.log("99".divide("3"));
console.log("100".divide("10"));
console.log("1024".divide("4"));
console.log("2".divide("0"));
console.log("----------------------");
