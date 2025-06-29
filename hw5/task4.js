function getArrayIntersection(array1, array2) {
  const result = [];
  const array2Copy = [...array2];

  for (let i = 0; i < array1.length; i++) {
    const index = array2Copy.indexOf(array1[i]);

    if (index !== -1) {
      result.push(array1[i]);
      array2Copy.splice(index, 1);
    }
  }

  return result;
}

const array1 = [1, 2, 2, 3, 4, 4, 4, 5, 5];
const array2 = [4, 4, 5, 5, 5, 6, 7, 8];

const commonIntersection = getArrayIntersection(array1, array2);
console.log('----- ArrayIntersection -----');
console.log(commonIntersection);

function getArrayUnion(array1, array2) {
  return [...new Set([...array1, ...array2])];
}

const commonUnion = getArrayUnion(array1, array2);
console.log('----- ArrayUnion -----');
console.log(commonUnion);
