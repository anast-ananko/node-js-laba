function deepCloneObject(obj, clonedObject = new Map()) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  if (clonedObject.has(obj)) {
    return clonedObject.get(obj);
  }

  if (Array.isArray(obj)) {
    const arrCopy = [];
    clonedObject.set(obj, arrCopy);

    for (const item of obj) {
      arrCopy.push(deepCloneObject(item, clonedObject));
    }

    return arrCopy;
  }

  const clonedObj = {};
  clonedObject.set(obj, clonedObj);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepCloneObject(obj[key], clonedObject);
    }
  }

  return clonedObj;
}

const obj = {
  name: "Alice",
  hobbies: ["reading", "gaming"],
  meta: {
    age: 25,
    location: "NY",
  },
};
obj.self = obj;

const clone = deepCloneObject(obj);
console.log(clone);
console.log(clone === obj);                 // Check if the cloned object is different from the original object
console.log(clone.self === clone);          // Check if the circular reference is present in the cloned object
console.log(clone.meta === obj.meta);       // Check if the nested object in the cloned object is a different object from the nested object in the original object
console.log(clone.hobbies === obj.hobbies); // Check if the array in the cloned object is a different object from the array in the original object
