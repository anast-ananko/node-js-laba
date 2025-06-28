function chunkArray(array, chunkSize) {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8];

const chunkSize2 = chunkArray(array, 2);
console.log('----- Chunk by 2 -----');
console.log(chunkSize2);

const chunkSize3 = chunkArray(array, 3);
console.log('----- Chunk by 3 -----');
console.log(chunkSize3);

const chunkSize4 = chunkArray(array, 4);
console.log('----- Chunk by 4 -----');
console.log(chunkSize4);
