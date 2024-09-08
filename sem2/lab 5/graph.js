'use strict';
export default class Graph {
  constructor(numberNodes) {
    this.numberNodes = numberNodes;
    this.adjacencyMatrix = [];
    this.isDirected = true;
    for (let i = 0; i < this.numberNodes; i++) {
      this.adjacencyMatrix[i] = new Array(this.numberNodes).fill(0);
    }
  }
  randm(generator) {
    for (const arr of this.adjacencyMatrix) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = generator() * 2;
      }
    }
  }
  mulmr(k) {
    for (const arr of this.adjacencyMatrix) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * k >= 1 ? 1 : 0;
      }
    }
  }
  toUndirected() {
    const matrix = this.adjacencyMatrix;
    const oldMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      oldMatrix[i] = matrix[i].slice();
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) matrix[j][i] = matrix[i][j];
      }
    }
    this.isDirected = !this.isDirected;
    return oldMatrix;
  }
  getDegreeOfNodes() {
    const res = [];
    const matrix = this.adjacencyMatrix;
    for (let i = 0; i < matrix.length; i++) {
      let counter1 = 0;
      let counter2 = 0;
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) {
          counter1++;
          if (i === j && !this.isDirected) {
            counter1++;
          }
        }
        if (matrix[j][i] === 1) {
          counter2++;
        }
      }
      if (this.isDirected) res.push([counter1 + counter2, counter1, counter2]);
      else res.push([counter1]);
    }
    return res;
  }
  isRegular() {
    const arr = this.getDegreeOfNodes();
    const temp = arr[0][0];
    for (const [el] of arr) {
      if (el !== temp) {
        return false;
      }
    }
    return temp;
  }
  findIsolatedNodes() {
    const arr = this.getDegreeOfNodes();
    const isolatedNodes = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === 0) {
        isolatedNodes.push(i + 1);
      }
    }
    return isolatedNodes;
  }
  findLeafNodes() {
    const arr = this.getDegreeOfNodes();
    const leafNodes = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === 1) {
        leafNodes.push(i + 1);
      }
    }
    return leafNodes;
  }
  multiplyMatrix(matrix1, matrix2) {
    let resultMatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
      resultMatrix[i] = new Array(matrix1.length).fill(0);
    }
    for (let k = 0; k < matrix1.length; k++) {
      for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1.length; j++) {
          resultMatrix[k][i] += matrix1[k][j] * matrix2[j][i];
        }
      }
    }
    return resultMatrix;
  }
  pathsOfSecondLength() {
    const matrix = [];
    const paths = [];
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      matrix[i] = [...this.adjacencyMatrix[i]];
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) {
          for (let k = 0; k < matrix.length; k++) {
            if (matrix[j][k] === 1) {
              paths.push([i, j, k]);
            }
          }
        }
      }
    }
    return paths;
  }
  pathsOfThirdLength() {
    const matrix = [];
    const paths = [];
    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      matrix[i] = [...this.adjacencyMatrix[i]];
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) {
          for (let k = 0; k < matrix.length; k++) {
            if (matrix[j][k] === 1) {
              for (let x = 0; x < matrix.length; x++) {
                if (matrix[k][x] === 1) {
                  paths.push([i, j, k, x]);
                }
              }
            }
          }
        }
      }
    }
    return paths;
  }
  pathsOfDefinedLength(length) {
    const matrix = this.adjacencyMatrix;
    let resultMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      resultMatrix[i] = [...matrix[i]];
    }
    if (length === 1) {
      return resultMatrix;
    }
    while (length > 1) {
      resultMatrix = this.multiplyMatrix(resultMatrix, matrix);
      length--;
    }
    return resultMatrix;
  }
  getReachabilityMatrix() {
    const matrix = this.adjacencyMatrix;
    let reachabilityMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      reachabilityMatrix[i] = [...matrix[i]];
    }
    for (let k = 0; k < matrix.length; k++) {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
          reachabilityMatrix[i][j] = reachabilityMatrix[i][j] || (reachabilityMatrix[i][k] && reachabilityMatrix[k][j]);
        }
      }
    }
    return reachabilityMatrix;
  }
  getStronglyConnectedMatrix() {
    const matrix = this.adjacencyMatrix;
    const stronglyConnectedMatrix = this.getReachabilityMatrix();
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        stronglyConnectedMatrix[i][j] *= stronglyConnectedMatrix[j][i];
      }
    }
    return stronglyConnectedMatrix;
  }
  makeAdjList() {
    const matrix = this.adjacencyMatrix;
    const adjList = [];
    for (let i = 0; i < matrix.length; i++) {
      adjList[i] = [];
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) {
          adjList[i].push(j);
        }
      }
    }
    return adjList;
  }
  isPath(start, finish, adj) {
    const stack = [];
    stack.push(start);
    const visited = new Array(adj.length + 1).fill(0);
    let current = start;
    while (stack.length) {
      if (current === finish) {
        return true;
      }
      stack.pop();
      for (const el of adj[current]) {
        if (!visited[el]) {
          stack.push(el);
        }
      }
      visited[current] = true;
      current = stack.at(-1);
    }
    return false;
  }
  findSCC() {
    const n = this.adjacencyMatrix.length;
    const ans = [];
    const isScc = new Array(n + 1).fill(0);
    const adjList = this.makeAdjList();
    for (let i = 0; i < n; i++) {
      if (!isScc[i]) {
        const scc = [i];
        for (let j = i + 1; j < n; j++) {
          if (!isScc[j] && this.isPath(i, j, adjList) && this.isPath(j, i, adjList)) {
            isScc[j] = 1;
            scc.push(j);
          }
        }
        ans.push(scc);
      }
    }
    return ans;
  }
  getCondensationMatrix() {
    const components = this.findSCC();
    const countOfVertices = components.length;

    const adjList = this.makeAdjList();
    const condensationMatrix = Array.from({ length: countOfVertices }, () => Array(countOfVertices).fill(0));
    const order = [];
    for (let k = 0; k < countOfVertices; k++) {
      for (let i = 0; i < countOfVertices; i++) {
        let counter = k;
        for (let j = 0; j < countOfVertices; j++) {
          if (this.isPath(components[i][0], components[j][0], adjList)) {
            counter++;
          }
        }
        if (counter === countOfVertices) {
          order.push(i);
        }
      }
    }
    for (let i = 0; i < countOfVertices - 1; i++) {
      condensationMatrix[order[i]][order[i + 1]] = 1;
    }
    return condensationMatrix;
  }
  bfs(start) {
    const adjList = this.makeAdjList();
    const path = [];
    const queue = [];
    const visited = new Array(adjList.length).fill(false);
    queue.unshift(start);
    visited[start] = true;
    let current = start;
    while (queue.length) {
      queue.pop();
      for (const el of adjList[current]) {
        if (!visited[el]) {
          queue.unshift(el);
          path.push([current, el]);
          visited[el] = true;
        }
      }
      current = queue.at(-1);
    }
    return path;
  }
  dfs(start) {
    const adjList = this.makeAdjList();
    const path = [];
    const stack = [];
    const visited = new Array(adjList.length).fill(false);
    stack.push(start);
    let current = start;
    while (stack.length) {
      stack.pop();
      visited[current] = true;
      for (const el of adjList[current].reverse()) {
        if (!visited[el]) {
          stack.push(el);
        }
      }
      path.push(current);
      current = stack.at(-1);
    }
    return path;
  }

}
