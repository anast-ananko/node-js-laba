function measureArrayPerformance(fn, array) {
  const t0 = performance.now();
  const result = fn(array);
  const t1 = performance.now();
  const time = t1 - t0;
  console.log(`Call to function took ${time} milliseconds.`);
  return { result, time };
}

const array = Array.from({ length: 100000 }, (_, i) => i);

// Map
function builtInMap(arr) {
  return arr.map((x) => x * 2);
}
function customMap(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result;
}

// Filter
function builtInFilter(arr) {
  return arr.filter((x) => x % 2 === 0);
}
function customFilter(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      result.push(arr[i]);
    }
  }
  return result;
}

// Reduce
function builtInReduce(arr) {
  return arr.reduce((sum, x) => sum + x, 0);
}
function customReduce(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

console.log("----- Map -----");
measureArrayPerformance(builtInMap, array);
measureArrayPerformance(customMap, array);

console.log("----- Filter -----");
measureArrayPerformance(builtInFilter, array);
measureArrayPerformance(customFilter, array);

console.log("----- Reduce -----");
measureArrayPerformance(builtInReduce, array);
measureArrayPerformance(customReduce, array);
