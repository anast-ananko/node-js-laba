import { Person } from "./task1.js";

function observeObject(obj, callback) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      callback(prop, "get");
      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, val, receiver) {
      callback(prop, "set");
      return Reflect.set(target, prop, val, receiver);
    },
  });
}

const person = new Person({
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
});

function callback(prop, action) {
  console.log(
    `Property "${prop}" was ${action === "get" ? "accessed" : "modified"}`
  );
}

const observedPerson = observeObject(person, callback);

// From Task 1 all properties of the person object read-only and non-writable
// Therefore we can't check set method from observeObject without error occurrence
console.log(observedPerson.firstName);
try {
  observedPerson.age = 33; 
} catch (e) {
  console.error(e.message);
}
console.log(observedPerson.age);
