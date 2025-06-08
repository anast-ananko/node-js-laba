const DataTransform = {
  addValues: (a, b) => {
    if (typeof a === "number" && typeof b === "number") return a + b;

    if (typeof a === "string" || typeof b === "string")
      return String(a) + String(b);

    if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b];

    if (typeof a === "object" && typeof b === "object" && a && b)
      return { ...a, ...b };

    throw new Error("Incompatible types for addition");
  },

  stringifyValue: (value) => {
    if (typeof value === "object" && value !== null) {
      try {
        return JSON.stringify(value);
      } catch {
        throw new Error("Unable to stringify object");
      }
    }

    return String(value);
  },

  invertBoolean: (value) => {
    if (typeof value !== "boolean") throw new Error("Expected a boolean value");

    return !value;
  },

  convertToNumber: (value) => {
    const num = typeof value === "string" ? parseFloat(value) : Number(value);

    if (isNaN(num)) throw new Error("Cannot convert to number");

    return num;
  },

  coerceToType: (value, type) => {
    switch (type) {
      case "string":
        return DataTransform.stringifyValue(value);
      case "number":
        return DataTransform.convertToNumber(value);
      case "boolean":
        return DataTransform.isTruthy(value).result;
      case "object":
        if (typeof value === "object") return value;
        try {
          return JSON.parse(value);
        } catch {
          throw new Error("Cannot coerce to object");
        }
      default:
        throw new Error(`Unsupported target type: ${type}`);
    }
  },

  isEqual: (a, b, useCoercion = false) => {
    return useCoercion ? a == b : a === b;
  },

  safeParseJSON: (str) => {
    try {
      return JSON.parse(str);
    } catch {
      throw new Error("Invalid JSON string");
    }
  },

  isTruthy: function (value) {
    if (value === 0) return { result: false, reason: "0 is falsy" };
    if (value === "") return { result: false, reason: "Empty string is falsy" };
    if (value === null) return { result: false, reason: "null is falsy" };
    if (value === undefined)
      return { result: false, reason: "undefined is falsy" };
    if (value === false) return { result: false, reason: "false is falsy" };

    return { result: true, reason: "All other values are truthy" };
  },

  deepClone: (obj) => {
    if (obj === null || typeof obj !== "object") return obj;

    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof RegExp) return new RegExp(obj);

    if (Array.isArray(obj)) {
      return obj.map((item) => DataTransform.deepClone(item));
    }

    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = DataTransform.deepClone(obj[key]);
      }
    }
    return clonedObj;
  },
};

export default DataTransform;

console.log("AddValues");
console.log(DataTransform.addValues(3, 4));
console.log(DataTransform.addValues("foo", 42));
console.log(DataTransform.addValues([1, 2], [3, 4]));
console.log(DataTransform.addValues({ a: 1 }, { b: 2 }));
console.log("---------");

console.log("StringifyValue");
console.log(DataTransform.stringifyValue([1, 2, 3]));
console.log("---------");

console.log("InvertBoolean");
console.log(DataTransform.invertBoolean(true));
console.log("---------");

console.log("ConvertToNumber");
console.log(DataTransform.convertToNumber("123.45"));
console.log("---------");

console.log("CoerceToType");
console.log(DataTransform.coerceToType("false", "boolean"));
console.log("---------");

console.log("IsEqual");
console.log(DataTransform.isEqual(0, false));
console.log(DataTransform.isEqual(0, false, true));
console.log("---------");

console.log("SafeParseJSON");
console.log(DataTransform.safeParseJSON('{"foo": 123, "bar": "baz"}'));
console.log("---------");

console.log("IsTruthy");
console.log(DataTransform.isTruthy(""));
console.log("---------");

console.log("DeepClone");
console.log(DataTransform.deepClone({ a: [1, 2], b: { c: 3 } }));
console.log("---------");
