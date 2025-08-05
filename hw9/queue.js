/**
 * Class representing a basic queue (FIFO) data structure.
 */
class Queue {
  constructor() {
    /**
     * Internal array to store queue elements.
     * @private
     * @type {Array}
     */
    this._data = [];
  }

  /**
   * Adds an item to the end of the queue.
   * @param {*} item - The item to add.
   * @returns {void}
   * Time Complexity: O(1)
   */
  enqueue(item) {
    this._data.push(item);
  }

  /**
   * Removes and returns the item at the front of the queue.
   * Returns undefined if the queue is empty.
   * @returns {*|undefined}
   * Time Complexity: O(n) 
   */
  dequeue() {
    return this._data.shift();
  }

  /**
   * Returns the item at the front of the queue without removing it.
   * Returns undefined if the queue is empty.
   * @returns {*|undefined}
   * Time Complexity: O(1)
   */
  peek() {
    return this._data[0];
  }
}

// Create a new queue instance
const queue = new Queue();
queue.enqueue("apple");
queue.enqueue("banana");
queue.enqueue("cherry");

console.log("Queue elements:", queue._data);

console.log("Front item:", queue.peek());

console.log("Dequeued item:", queue.dequeue());
console.log("Front item after dequeue:", queue.peek());
