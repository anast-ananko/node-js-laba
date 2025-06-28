function customFilterUnique(array, callback) {
  const uniqueElements = new Set();

  return array.filter((item) => {
    const value = callback(item);

    if (uniqueElements.has(value)) return false;

    uniqueElements.add(value);
    return true;
  });
}

const data1 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Charlie" },
];

const data2 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Alice" }, 
  { id: 4, name: "Charlie" },
  { id: 5, name: "Charlie" },
];

const uniqueById = customFilterUnique(data1, (item) => item.id);
console.log('----- Filter by id  -----');
console.log(uniqueById);

const uniqueByName = customFilterUnique(data2, (item) => item.name);
console.log('----- Filter by name  -----');
console.log(uniqueByName);
