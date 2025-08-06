/**
 * Custom hash function to compute a hash value for a given string.
 * Returns the computed hash value for the input string.
 * @param {string} str - The input string to be hashed.
 * @returns {number}
 */
function hashFunction(str) {
  let hash = 0;
  const prime = 31; // Prime number multiplier

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    hash = (hash * prime + charCode) >>> 0; // Ensuring a 32-bit unsigned integer
  }

  return hash;
}

console.log(hashFunction("hello"));
console.log(hashFunction("world"));
console.log(hashFunction("hello!"));
console.log(hashFunction("Hello"));

/**
 * HashTable class that implements a basic hash table with linear probing for collision resolution.
 * @param {number} [size=32] - The size of the hash table. Default is 32.
 */
class HashTable {
  constructor(size = 32) {
    /**
     * The size of the hash table (number of slots).
     * @type {number}
     */
    this.size = size;
    /**
     * Array to store the keys in the hash table.
     * @type {Array<string|undefined>}
     */
    this.keys = new Array(size);
    /**
     * Array to store the values corresponding to the keys in the hash table.
     * @type {Array<*>}
     */
    this.values = new Array(size);
  }

  /**
   * Private helper method to compute the hash index for a given key.
   * Returns the index for the given key within the hash table.
   * @param {string} key - The key to be hashed.
   * @returns {number}
   */
  _hash(key) {
    return hashFunction(key) % this.size;
  }

  /**
   * Inserts a key-value pair into the hash table. 
   * @param {string} key - The key to insert.
   * @param {*} value - The value to associate with the key.   
   */
  set(key, value) {
    let index = this._hash(key);
    let startIndex = index;

    // Linear probing: If the slot is occupied, we keep checking the next index
    do {
      if (this.keys[index] === undefined || this.keys[index] === key) {
        this.keys[index] = key;
        this.values[index] = value;
        return;
      }
      index = (index + 1) % this.size;
    } while (index !== startIndex);

    throw new Error("HashTable is full, cannot insert new key");
  }

  /**
   * Retrieves the value associated with the given key.
   * Returns the value associated with the key, or `undefined` if the key does not exist.
   * @param {string} key - The key whose value is to be retrieved.
   * @returns {*}
   */
  get(key) {
    let index = this._hash(key);
    const startIndex = index;

    // Linear probing: Search for the key, checking next indices if necessary
    do {
      if (this.keys[index] === undefined) return undefined;
      if (this.keys[index] === key) return this.values[index];
      index = (index + 1) % this.size;
    } while (index !== startIndex);

    return undefined;
  }

  /**
   * Deletes a key-value pair from the hash table.
   * Returns true if the key was successfully deleted, or false if the key was not found.
   * After deletion, it rehashes any subsequent keys.
   * @param {string} key - The key to delete.
   * @returns {boolean}
   */
  delete(key) {
    let index = this._hash(key);
    const startIndex = index;

    do {
      if (this.keys[index] === undefined) return false; // Not found
      if (this.keys[index] === key) {
        this.keys[index] = undefined;
        this.values[index] = undefined;

        // Rehash subsequent keys to avoid breaking the probe chain
        this._rehashFrom(index);
        return true;
      }
      index = (index + 1) % this.size;
    } while (index !== startIndex);

    return false;
  }

  /**
   * Private helper method to rehash all keys that follow a deleted key in the probe sequence.
   * @param {number} deletedIndex - The index where a key was deleted.
   */
  _rehashFrom(deletedIndex) {
    let index = (deletedIndex + 1) % this.size;

    while (this.keys[index] !== undefined) {
      const keyToRehash = this.keys[index];
      const valToRehash = this.values[index];

      // Remove current key-value
      this.keys[index] = undefined;
      this.values[index] = undefined;

      // Reinsert them
      this.set(keyToRehash, valToRehash);

      index = (index + 1) % this.size;
    }
  }

  /**
   * Prints all key-value pairs in the hash table.
   */
  print() {
    for (let i = 0; i < this.size; i++) {
      if (this.keys[i] !== undefined) {
        console.log(`${i}: ${this.keys[i]} => ${this.values[i]}`);
      }
    }
  }
}

// Creating a new hash table with 5 slots
const table = new HashTable(5);

// Adding some key-value pairs
table.set("ab", 123);
table.set("ba", 456);
table.set("abc", 789);
table.set("bac", 987);

// Retrieving values by key
console.log('get("ab"):', table.get("ab"));
console.log('get("ba"):', table.get("ba"));
console.log('get("abc"):', table.get("abc"));
console.log('get("bac"):', table.get("bac"));
console.log('get("notfound"):', table.get("notfound"));

// Deleting
console.log('delete("ba"):', table.delete("ba"));
console.log('get("ba") after delete:', table.get("ba"));

// Printing the entire hash table
table.print();
