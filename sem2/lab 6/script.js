'use strict';
import Graph from './graph.js';
import DrawGraph from './drawGraph.js';
const n1 = 3;
const n2 = 2;
const n3 = 1;
const n4 = 0;
let k = 1.0 - n3 * 0.01 - n4 * 0.005 - 0.05;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const nodeRadius = 30;
const distanceFromCenter = 270;
const amountOfNodes = 10 + n3;
let adjacencyMatrix = [];

for (let i = 0; i < amountOfNodes; i++) {
  adjacencyMatrix[i] = new Array(amountOfNodes).fill(0);
}
let weightMatrix = [];
let graph;
let drawGraph;
let counter = 0;
const randm = (adjacencyMatrix, generator) => {
  for (const arr of adjacencyMatrix) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = generator() * 2;
    }
  }
};
const mulmr = (adjacencyMatrix, k) => {
  for (const arr of adjacencyMatrix) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] * k >= 1 ? 1 : 0;
    }
  }
};
const toUndirected = (adjacencyMatrix) => {
  const matrix = adjacencyMatrix;
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
};

const generateWeightMatrix = (generator) => {
  const b = [];
  const c = [];
  const d = [];
  const h = [];
  const tr = [];
  const weightMatrix = [];
  for (let i = 0; i < amountOfNodes; i++) {
    weightMatrix[i] = new Array(amountOfNodes).fill(0);
    b[i] = new Array(amountOfNodes).fill(0);
    c[i] = new Array(amountOfNodes).fill(0);
    d[i] = new Array(amountOfNodes).fill(0);
    for (let j = 0; j < amountOfNodes; j++) {
      b[i][j] = generator() * 2;
      c[i][j] = Math.ceil(b[i][j] * 100 * adjacencyMatrix[i][j]);
      d[i][j] = c[i][j] === 0 ? 0 : 1;
    }
  }
  for (let i = 0; i < amountOfNodes; i++) {
    h[i] = new Array(amountOfNodes).fill(0);
    tr[i] = new Array(amountOfNodes).fill(0);
    for (let j = 0; j < amountOfNodes; j++) {
      h[i][j] = d[i][j] !== d[j][i] ? 1 : 0;
      tr[i][j] = i < j ? 1 : 0;
      weightMatrix[i][j] = (d[i][j] + h[i][j] * tr[i][j]) * c[i][j];
      weightMatrix[j][i] = weightMatrix[i][j];
    }
  }
  return weightMatrix;
};
const makeEdgesList = (adjacencyMatrix, weightMatrix) => {
  const verticesList = [];
  for (let i = 0; i < adjacencyMatrix.length; i++) {
    for (let j = i + 1; j < adjacencyMatrix.length; j++) {
      if (adjacencyMatrix[i][j] === 1) verticesList.push([i, j, weightMatrix[i][j]]);
    }
  }
  return verticesList;
};

randm(adjacencyMatrix, new Math.seedrandom([n1, n2, n3, n4].join));
mulmr(adjacencyMatrix, k);
toUndirected(adjacencyMatrix);
weightMatrix = generateWeightMatrix(new Math.seedrandom([n1, n2, n3, n4].join));
drawGraph = new DrawGraph(canvas, adjacencyMatrix, weightMatrix);
drawGraph.drawGraphInCircle(distanceFromCenter, nodeRadius);
const edges = makeEdgesList(adjacencyMatrix, weightMatrix);
graph = new Graph(edges[0]);
const temp = graph;
for (let i = 1; i < edges.length; i++) {
  graph.pushEdge(edges[i]);
}
console.log(adjacencyMatrix);
console.log(weightMatrix);
console.log(graph.kruskalMST(amountOfNodes));
console.log(graph.sumSMT(amountOfNodes));

document.getElementById('next-step').addEventListener('click', (event) => {
  const path = graph.kruskalMST(amountOfNodes);
  if (counter >= path.length) counter = 0;
  drawGraph.drawPath(nodeRadius, path[counter][0], path[counter][1]);
  counter++;
});
