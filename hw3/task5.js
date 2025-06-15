function lazyMap(array, fn) {
  let index = 0;

  return {
    next: function () {
      if (index < array.length) {
        const value = fn(array[index]);
        index++;
        return { value, done: false };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
}

const numbers = [1, 2, 3];
const lazy = lazyMap(numbers, (x) => x * 2);

console.log(lazy.next());
console.log(lazy.next());
console.log(lazy.next());
console.log(lazy.next());

function fibonacciGenerator() {
  let a = 0;
  let b = 1;

  return {
    next: function () {
      const value = a;
      [a, b] = [b, a + b];
      return { value, done: false };
    },
  };
}

const fib = fibonacciGenerator();
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());