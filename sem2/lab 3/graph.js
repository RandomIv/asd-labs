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
    return oldMatrix;
  }
  addEdge(node1, node2) {
    if (this.isDirected) {
      this.adjacencyMatrix[node1][node2] = 1;
    } else {
      this.adjacencyMatrix[node1][node2] = 1;
      this.adjacencyMatrix[node2][node1] = 1;
    }
  }
  deleteEdge(node1, node2) {
    if (this.isDirected) {
      this.adjacencyMatrix[node1][node2] = 0;
    } else {
      this.adjacencyMatrix[node1][node2] = 0;
      this.adjacencyMatrix[node2][node1] = 0;
    }
  }
}
