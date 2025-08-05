/**
 * Class representing an undirected graph using adjacency lists.
 */
class Graph {
  constructor() {
    /**
     * Map where key = vertex, value = set of neighboring vertices.
     * @type {Map<any, Set<any>>}
     */
    this.vertices = new Map();
  }

  /**
   * Adds a vertex to the graph if it doesn't exist.
   * @param {*} v - Vertex to add.
   */
  addVertex(v) {
    if (!this.vertices.has(v)) {
      this.vertices.set(v, new Set());
    }
  }

  /**
   * Adds an undirected edge between u and v.
   * If vertices don't exist, they are added.
   * @param {*} u - Vertex u.
   * @param {*} v - Vertex v.
   */
  addEdge(u, v) {
    this.addVertex(u);
    this.addVertex(v);
    this.vertices.get(u).add(v);
    this.vertices.get(v).add(u);
  }

  /**
   * Depth-First Search traversal from start vertex.
   * Returns array of vertices in DFS order.
   * @param {*} start - Starting vertex.
   * @returns {Array}
   */
  dfs(start) {
    if (!this.vertices.has(start)) return [];

    const visited = new Set();
    const result = [];
    const stack = [start];

    while (stack.length) {
      const node = stack.pop();
      if (visited.has(node)) continue;
      visited.add(node);
      result.push(node);

      for (const neighbor of this.vertices.get(node)) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }

    return result;
  }

  /**
   * Breadth-First Search traversal from start vertex.
   * Returns array of vertices in BFS order.
   * @param {*} start - Starting vertex.
   * @returns {Array}
   */
  bfs(start) {
    if (!this.vertices.has(start)) return [];

    const visited = new Set([start]);
    const result = [];
    const queue = [start];

    while (queue.length) {
      const node = queue.shift();
      result.push(node);

      for (const neighbor of this.vertices.get(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

/**
 * Dijkstra's algorithm for shortest path in weighted graph.
 * @param {Object} graph - Adjacency list with nodes and weights. Format:
 * {
 *   node1: [{node: node2, weight: 5}, {node: node3, weight: 10}],
 *   node2: [{node: node1, weight: 5}, ...],
 *   ...
 * }
 * Returns object with shortest path array and total distance, or null if no path.
 * @param {*} start - Start node.
 * @param {*} end - End node.
 * @returns {Object|null}
 * Time complexity: O(n^2)
 */
function dijkstra(graph, start, end) {
  const visited = new Set();
  const distances = {};
  const prev = {};
  const nodes = [];

  for (const node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
    nodes.push(node);
  }
  distances[start] = 0;

  while (nodes.length > 0) {
    nodes.sort((a, b) => distances[a] - distances[b]);
    const current = nodes.shift();

    if (distances[current] === Infinity) break;
    if (current === end) break;

    visited.add(current);

    for (const neighbor of graph[current]) {
      const node = neighbor.node;

      if (!visited.has(node)) {
        const alt = distances[current] + neighbor.weight;

        if (alt < distances[node]) {
          distances[node] = alt;
          prev[node] = current;
        }
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  if (path[0] !== start) return null;
  return { path, distance: distances[end] };
}

/**
 * Breadth-First Search algorithm to find the shortest path in unweighted graph.
 * Returns array of nodes representing shortest path or null if none.
 * @param {Object} graph - Adjacency list. Format:
 * {
 *   node1: [node2, node3, ...],
 *   node2: [node1, ...],
 *   ...
 * }
 * @param {*} start - Start node.
 * @param {*} end - End node.
 * @returns {Array|null} 
 * Time complexity: O(V + E) where V = vertices, E = edges
 */
function bfs(graph, start, end) {
  const queue = [start];
  const visited = new Set([start]);
  const prev = {};

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === end) break;

    for (const neighbor of graph[current]) {
      // neighbor can be object {node, weight} or just node
      const node = typeof neighbor === "object" ? neighbor.node : neighbor;

      if (!visited.has(node)) {
        visited.add(node);
        prev[node] = current;
        queue.push(node);
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  if (path[0] !== start) return null;
  return path;
}

// Create a new graph instance
const graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
graph.addEdge("D", "E");

// DFS and BFS traversal
console.log("DFS from A:", graph.dfs("A"));
console.log("BFS from A:", graph.bfs("A"));

// Weighted graph example for Dijkstra
const weightedGraph = {
  A: [
    { node: "B", weight: 2 },
    { node: "C", weight: 5 },
  ],
  B: [
    { node: "A", weight: 2 },
    { node: "D", weight: 1 },
  ],
  C: [
    { node: "A", weight: 5 },
    { node: "D", weight: 2 },
  ],
  D: [
    { node: "B", weight: 1 },
    { node: "C", weight: 2 },
    { node: "E", weight: 1 },
  ],
  E: [{ node: "D", weight: 1 }],
};

const shortestPath = dijkstra(weightedGraph, "A", "E");
console.log("Dijkstra shortest path from A to E:", shortestPath);

const shortestPathBFS = bfs(
  {
    A: ["B", "C"],
    B: ["A", "D"],
    C: ["A", "D"],
    D: ["B", "C", "E"],
    E: ["D"],
  },
  "A",
  "E"
);
console.log("BFS shortest path from A to E:", shortestPathBFS);
