function validateObject(obj, schema) {
  for (const key in schema) {
    const rules = schema[key];

    if (rules.required && !(key in obj)) {
      return false;
    }

    const value = obj[key];

    if (rules.type && typeof value !== rules.type) {
      return false;
    }

    if (typeof rules.validate === "function" && !rules.validate(value)) {
      return false;
    }
  }

  return true;
}

const person1 = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
};
const person2 = {
  age: 35,
  email: "mike@example.com",
};
const person3 = {
  name: "Joe",
  age: 50,
  email: "example.com",
};
const schema = {
  name: {
    required: true,
    type: "string",
  },
  age: {
    required: true,
    type: "number",
    validate: (val) => val >= 0 && val <= 120,
  },
  email: {
    required: false,
    type: "string",
    validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  },
};

// First person Alice meets all the validation criteria
const result1 = validateObject(person1, schema);
console.log(result1);

// Second person Mike does not meet all the validation criteria, because the required field Name is missing
const result2 = validateObject(person2, schema);
console.log(result2);

// Third person Joe does not meet all the validation criteria, because there is a mistake in Email field
const result3 = validateObject(person3, schema);
console.log(result3);
