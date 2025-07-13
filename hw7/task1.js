const promises1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
const promises2 = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];

function promiseAll(promisesArray) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    if (promisesArray.length === 0) {
      return resolve([]);
    }

    promisesArray.forEach((promise, index) => {
      promise
        .then((res) => {
          results[index] = res;
          completed++;
          if (completed === promisesArray.length) {
            resolve(results);
          }
        })
        .catch((e) => reject(e));
    });
  });
}

promiseAll(promises1)
  .then((results) => {
    console.log("All promises resolved:", results); // Expected: [1, 2, 3]
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

promiseAll(promises2)
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error); // Expected: 2
  });
