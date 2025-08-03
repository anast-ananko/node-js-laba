class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(v) {
    if (!this.vertices.has(v)) {
      this.vertices.set(v, new Set());
    }
  }

  addEdge(u, v) {
    this.addVertex(u);
    this.addVertex(v);
    this.vertices.get(u).add(v);
    this.vertices.get(v).add(u);
  }

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
