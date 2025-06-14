function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1();
counter1();
counter1();
counter2();
console.log(counter1());
console.log(counter2());

function repeatFunction(fn, num) {
  return function (...args) {
    if (num > 0) {
      for (let i = 0; i < num; i++) {
        fn(...args);
      }
    } else {
      while (true) {
        fn(...args);
      }
    }
  };
}

const sayHi = () => console.log("Hi!");

const repeat3 = repeatFunction(sayHi, 3);
repeat3();
