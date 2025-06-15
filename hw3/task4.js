function calculateFactorial(num, acc = 1) {
  if (num <= 1) return acc;

  return calculateFactorial(num - 1, acc * num);
}

const factorial1 = calculateFactorial(1);
const factorial5 = calculateFactorial(5);
const factorial10 = calculateFactorial(10);
console.log(factorial1);
console.log(factorial5);
console.log(factorial10);

function power(base, exponent) {
  if (typeof base !== "number" || typeof exponent !== "number") {
    throw new TypeError("Both base and exponent must be numbers.");
  }

  if (!Number.isInteger(exponent)) {
    throw new TypeError("Exponent must be an integer.");
  }

  if (exponent < 0) {
    throw new RangeError("Exponent must be a non-negative integer.");
  }

  if (exponent === 0) {
    return 1;
  }

  return base * power(base, exponent - 1);
}

const power1 = power(8, 0);
const power2 = power(2, 4);
const power3 = power(3, 3);
console.log(power1);
console.log(power2);
console.log(power3);
