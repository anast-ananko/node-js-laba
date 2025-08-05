/**
 * Class representing a single node in a singly linked list.
 */
class Node {
  constructor(value, next = null) {
    /**
     * Value stored in the node.
     * @type {*}
     */
    this.value = value;
    /**
     * Reference to the next node.
     * @type {Node|null}
     */
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    /**
     * The first node (head) of the list.
     * @type {Node|null}
     */
    this.head = null;
    /**
     * The last node (tail) of the list.
     * @type {Node|null}
     */
    this.tail = null;
  }

  /**
   * Insert a new node at the beginning of the list.
   * @param {*} value - Value to prepend.
   * Time Complexity: O(1)
   */
  prepend(value) {
    const newNode = new Node(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
  }

  /**
   * Insert a new node at the end of the list.
   * @param {*} value - Value to append.
   * Time Complexity: O(1)
   */
  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  /**
   * Delete the first node containing the given value.
   * Returns true if deletion was successful, otherwise false.
   * @param {*} value - Value to delete.
   * @returns {boolean}
   * Time Complexity: O(n)
   */
  delete(value) {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }
      return true;
    }

    let prev = this.head;
    let cur = this.head.next;

    while (cur) {
      if (cur.value === value) {
        prev.next = cur.next;

        if (this.tail === cur) {
          this.tail = prev;
        }
        return true;
      }
      prev = cur;
      cur = cur.next;
    }
    return false;
  }

  /**
   * Search for a node with the given value.
   * Returns  Node if found, otherwise null.
   * @param {*} value - Value to search for.
   * @returns {Node|null}
   * Time Complexity: O(n)
   */
  search(value) {
    if (!this.head) return null;

    let cur = this.head;

    while (cur) {
      if (cur.value === value) return cur;
      cur = cur.next;
    }
    return null;
  }
}

/**
 * Detect if a linked list contains a cycle using Floyd's Tortoise and Hare algorithm.
 * Returns true if cycle detected, else false.
 * @param {Node|null} head - Head node of the linked list.
 * @returns {boolean}
 * Time Complexity: O(n)
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}

// Create a new instance of LinkedList
const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5);

// Search for existing and non-existing values
console.log("Search 20:", list.search(20));
console.log("Search 99:", list.search(99));

// Delete a value
console.log("Delete 10:", list.delete(10));
console.log("Delete 99:", list.delete(99));

// Check final state of list
let current = list.head;
let values = [];
while (current) {
  values.push(current.value);
  current = current.next;
}
console.log("Current list values:", values);

// Create a list with a cycle
const cycleHead = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);

cycleHead.next = node2;
node2.next = node3;
node3.next = node2; 

console.log("Cycle detected:", hasCycle(cycleHead));

// Create a list without a cycle
const noCycleHead = new Node(1, new Node(2, new Node(3)));

console.log("Cycle detected:", hasCycle(noCycleHead));
