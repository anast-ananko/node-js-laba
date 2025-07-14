const promises = [
  Promise.resolve(1),
  Promise.reject("Error occurred"),
  Promise.resolve(3),
];

function promiseAllSettled(promisesArray) {
  return new Promise((resolve) => {
    let results = [];
    let completed = 0;

    promisesArray.forEach((promise, index) => {
      promise
        .then((res) => {
          results[index] = { status: "fulfilled", value: res };
        })
        .catch((e) => {
          results[index] = { status: "rejected", reason: e };
        })
        .finally(() => {
          completed++;
          if (completed === promisesArray.length) {
            resolve(results);
          }
        });
    });
  });
}

promiseAllSettled(promises).then((results) => {
  console.log("All promises settled:", results);
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
});
