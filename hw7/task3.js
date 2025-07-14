function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

function chainPromises(functionsArray) {
  return functionsArray.reduce((acc, fn) => {
    return acc.then(fn);
  }, Promise.resolve());
}

chainPromises(functionsArray)
  .then((result) => {
    console.log("Chained promise result:", result);
    // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch((error) => {
    console.error("Chained promise error:", error);
  });
