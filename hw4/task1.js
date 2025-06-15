class Person {
  constructor({ firstName, lastName, age, email }) {
    Object.defineProperties(this, {
      firstName: {
        value: firstName,
        writable: false,
        enumerable: true,
        configurable: false,
      },
      lastName: {
        value: lastName,
        writable: false,
        enumerable: true,
        configurable: false,
      },
      age: {
        value: age,
        writable: false,
        enumerable: true,
        configurable: false,
      },
      email: {
        value: email,
        writable: false,
        enumerable: true,
        configurable: false,
      },
    });

    Object.defineProperty(this, "address", {
      value: {},
      writable: true,
      enumerable: false,
      configurable: false,
    });
  }

  updateInfo(newInfo) {
    const updatedData = {
      firstName: newInfo.firstName ?? this.firstName,
      lastName: newInfo.lastName ?? this.lastName,
      age: newInfo.age ?? this.age,
      email: newInfo.email ?? this.email,
    };

    const newPerson = new Person(updatedData);

    Object.assign(newPerson.address, this.address);

    return newPerson;
  }
}

const person = new Person({
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
});

const updated = person.updateInfo({ firstName: "Mary", age: 32 });
console.log(person.firstName);
console.log(updated.firstName);
console.log(person.age);
console.log(updated.age);
person.lastName = "Smith";
console.log(person.lastName);
updated.age = 99;
console.log(updated.age);

person.address.city = "London";
console.log(person.address.city);
console.log(Object.keys(person));
const luke = person.updateInfo({ firstName: "Luke" });
console.log(luke.address.city);
