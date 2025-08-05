/**
 * Class representing a basic stack (LIFO) data structure.
 */
class Stack {
  constructor() {
    /**
     * Internal array to store stack elements.
     * @private
     * @type {Array}
     */
    this._data = [];
  }

  /**
   * Pushes an item onto the top of the stack.
   * @param {*} item - The item to add.
   * @returns {void}
   * Time Complexity: O(1)
   */
  push(item) {
    this._data.push(item);
  }

  /**
   * Removes and returns the top item from the stack.
   * Returns undefined if the stack is empty.
   * @returns {*|undefined}
   * Time Complexity: O(1)
   */
  pop() {
    return this._data.pop();
  }

  /**
   * Returns the top item of the stack without removing it.
   * Returns undefined if the stack is empty.
   * @returns {*|undefined}
   * Time Complexity: O(1)
   */
  peek() {
    return this._data[this._data.length - 1];
  }
}

/**
 * Class representing a stack that supports retrieving
 * the minimum and maximum elements in O(1) time.
 * Extends the basic Stack class.
 */
class MinMaxStack extends Stack {
  constructor() {
    super();
    /**
     * Stack to track minimum values.
     * @private
     * @type {Array}
     */
    this._minStack = [];
    /**
     * Stack to track maximum values.
     * @private
     * @type {Array}
     */
    this._maxStack = [];
  }

  /**
   * Pushes an item onto the stack.
   * Updates min and max stacks accordingly.
   * @param {*} item - The item to add.
   * @returns {void}
   * Time Complexity: O(1)
   */
  push(item) {
    super.push(item);
    if (this._minStack.length === 0 || item <= this.getMin()) {
      this._minStack.push(item);
    }
    if (this._maxStack.length === 0 || item >= this.getMax()) {
      this._maxStack.push(item);
    }
  }

  /**
   * Pushes an item onto the stack.
   * Updates min and max stacks accordingly.
   * @param {*} item - The item to add.
   * @returns {void}
   * Time Complexity: O(1)
   */
  pop() {
    const val = super.pop();
    if (val === undefined) return undefined;

    if (val === this.getMin()) {
      this._minStack.pop();
    }
    if (val === this.getMax()) {
      this._maxStack.pop();
    }

    return val;
  }

  /**
   * Returns the current minimum element in the stack.
   * Returns null if the stack is empty.
   * @returns {*|null}
   * Time Complexity: O(1)
   */
  getMin() {
    return this._minStack.length
      ? this._minStack[this._minStack.length - 1]
      : null;
  }

  /**
   * Returns the current maximum element in the stack.
   * Returns null if the stack is empty.
   * @returns {*|null}
   * Time Complexity: O(1)
   */
  getMax() {
    return this._maxStack.length
      ? this._maxStack[this._maxStack.length - 1]
      : null;
  }
}

// Create a new instance of MinMaxStack
const stack = new MinMaxStack();
stack.push(10);
stack.push(5);
stack.push(20);
stack.push(3);

console.log("Stack elements:", stack._data);

console.log("Current Min:", stack.getMin());
console.log("Current Max:", stack.getMax());

// Pop elements and observe how min and max change
console.log("Popped:", stack.pop());
console.log("Min after pop:", stack.getMin());
console.log("Max after pop:", stack.getMax());

console.log("Popped:", stack.pop());
console.log("Min after pop:", stack.getMin());
console.log("Max after pop:", stack.getMax());

console.log("Peek top element:", stack.peek());
