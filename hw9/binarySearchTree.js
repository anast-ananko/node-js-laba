/**
 * Class representing a node in a binary tree.
 */
class Node {
  constructor(value) {
    /**
     * Value stored in the node.
     * @type {*}
     */
    this.value = value;
    /**
     * Left child node.
     * @type {Node|null}
     */
    this.left = null;
    /**
     * Right child node.
     * @type {Node|null}
     */
    this.right = null;
  }
}

/**
 * Class representing a Binary Search Tree (BST).
 */
class BinarySearchTree {
  constructor() {
    /**
     * Root node of the tree.
     * @type {Node|null}
     */
    this.root = null;
  }

  /**
   * Inserts a value into the BST.
   * Duplicates are ignored.
   * @param {*} value - The value to insert.
   * Time Complexity: O(log n) or O(n)
   */
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return; // ignore duplicates
    }

    let cur = this.root;
    while (true) {
      if (value === cur.value) {
        return;
      }

      if (value < cur.value) {
        if (!cur.left) {
          cur.left = newNode;
          return;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = newNode;
          return;
        }
        cur = cur.right;
      }
    }
  }

  /**
   * Searches for a value in the BST.
   * Returns true if found, false otherwise.
   * @param {*} value - The value to find.
   * @returns {boolean}
   * Time Complexity: O(log n) or O(n)
   */
  search(value) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) return true;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return false;
  }

  /**
   * In-order traversal (left, root, right).
   * Returns sorted array of values.
   * @param {Node} node - Start node (default root).
   * @param {Array} result - Accumulates values.
   * @returns {Array}
   */
  inOrder(node = this.root, result = []) {
    if (!node) return result;
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
    return result;
  }

  /**
   * Pre-order traversal (root, left, right).
   * @param {Node} node - Start node (default root).
   * @param {Array} result - Accumulates values.
   * @returns {Array}
   */
  preOrder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    return result;
  }

  /**
   * Post-order traversal (left, right, root).
   * @param {Node} node - Start node (default root).
   * @param {Array} result - Accumulates values.
   * @returns {Array}
   */
  postOrder(node = this.root, result = []) {
    if (!node) return result;
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
    return result;
  }
}

/**
 * Checks whether a binary tree is a valid BST.
 * Returns true if valid BST, false otherwise.
 * @param {Node|null} node - Current node.
 * @param {*} min - Minimum allowed value (exclusive).
 * @param {*} max - Maximum allowed value (exclusive).
 * @returns {boolean}
 * Time Complexity: O(n)
 */
function isBST(node, min = null, max = null) {
  if (node === null) return true;

  if (
    (min !== null && node.value <= min) ||
    (max !== null && node.value >= max)
  ) {
    return false;
  }

  return (
    isBST(node.left, min, node.value) && isBST(node.right, node.value, max)
  );
}

// Create a new BST instance
const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(12);
tree.insert(17);

console.log("In-order traversal (sorted):", tree.inOrder());

console.log("Pre-order traversal:", tree.preOrder());

console.log("Post-order traversal:", tree.postOrder());

console.log("Search 7:", tree.search(7));
console.log("Search 20:", tree.search(20));

console.log("Is valid BST?", isBST(tree.root));

tree.root.left.right.value = 20;

console.log("Is valid BST after modification?", isBST(tree.root));
