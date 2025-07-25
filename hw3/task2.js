function getFullName(person) {
  if (
    typeof person !== "object" ||
    person === null ||
    typeof person.firstName !== "string" ||
    typeof person.lastName !== "string"
  ) {
    throw new TypeError(
      "person must be an object with string properties 'firstName' and 'lastName'."
    );
  }

  return `${person.firstName} ${person.lastName}`;
}

const person = { firstName: "Joe", lastName: "More" };

const fullName = getFullName(person);
console.log(fullName);

function filterUniqueWords(text) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string.");
  }

  const compose = (f, g) => (x) => f(g(x));

  const normalizeText = (str) => str.toLowerCase().split(" ");
  const uniqueSorted = (arr) => Array.from(new Set(arr)).sort();

  return compose(uniqueSorted, normalizeText)(text);
}

const text = "Rose pen rose Pen pen lamp mouse mouse Lamp lamp laptop";

const uniqueWords = filterUniqueWords(text);
console.log(uniqueWords);

function getAverageGrade(students) {
  if (!Array.isArray(students)) {
    throw new TypeError("students must be an array.");
  }

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  const getGrades = (student) => student.grades;
  const allGrades = (students) => students.flatMap(getGrades);

  const average = (arr) => sum(arr) / arr.length;

  const compose = (f, g) => (x) => f(g(x));

  return compose(average, allGrades)(students);
}

const students = [
  {
    name: "Alice",
    grades: [8, 9, 7],
  },
  {
    name: "Bob",
    grades: [7, 6, 5],
  },
  {
    name: "Charlie",
    grades: [9, 2, 6],
  },
];

const averageGrade = getAverageGrade(students);
console.log(averageGrade);
