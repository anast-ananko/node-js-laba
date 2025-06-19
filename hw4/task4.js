import { Person } from "./task1.js";

function createImmutableObject(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const result = {};

  Object.getOwnPropertyNames(obj).forEach((key) => {
    const value = obj[key];

    const immutableValue = createImmutableObject(value);

    Object.defineProperty(result, key, {
      value: immutableValue,
      writable: false,
      configurable: false,
      enumerable: true,
    });
  });

  return result;
}

const person = new Person({
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
});

console.log('----- Check the immutability of Address object -----')
person.address.city = "Minsk";
console.log(person.address.city);
person.address.city = "Grodno";
console.log(person.address.city);

const immutablePerson = createImmutableObject(person);
try {
  immutablePerson.address.city = "Los Angeles";
} catch (e) {
  console.error(e.message);
}
