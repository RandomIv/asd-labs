'use strict';
import Graph from './graph.js';
import DrawGraph from './drawGraph.js';
const n1 = 3;
const n2 = 2;
const n3 = 1;
const n4 = 0;
let k = 1.0 - n3 * 0.01 - n4 * 0.005 - 0.15;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight - document.getElementById('header').offsetHeight;
canvas.width = window.innerWidth;

const nodeRadius = 30;
const distanceFromCenter = 270;
const amountOfNodes = 10 + n3;
let graph;
let path = [];
let drawGraph;
let counter = 1;
let searchType = '';
let edgesPath = [];
let matrixOfPath = [];
document.addEventListener('keypress', (event) => {
  //press Enter co change
  if (event.code === 'Digit1') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    graph = new Graph(amountOfNodes);
    const generator = new Math.seedrandom([n1, n2, n3, n4].join);
    graph.randm(generator);
    graph.mulmr(k);
    drawGraph = new DrawGraph(canvas, graph, nodeRadius);
    drawGraph.drawGraphInCircle(distanceFromCenter);
    console.log(graph.adjacencyMatrix);
  }
  if (event.code === 'Digit2') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    graph = new Graph(amountOfNodes);
    const generator = new Math.seedrandom([n1, n2, n3, n4].join);
    graph.randm(generator);
    graph.mulmr(k);
    graph.toUndirected();
    drawGraph = new DrawGraph(canvas, graph, nodeRadius);
    drawGraph.drawGraphInCircle(distanceFromCenter);
    console.log(graph.adjacencyMatrix);
  }
});
document.getElementById('bfs').addEventListener('click', (event) => {
  path = [];
  edgesPath = [];
  matrixOfPath = new Array(amountOfNodes);
  for (let i = 0; i < amountOfNodes; i++) {
    matrixOfPath[i] = new Array(amountOfNodes).fill(0);
  }
  const scc = graph.findSCC();
  for (let i = 0; i < scc.length; i++) {
    for (const el of graph.bfs(scc[i][0])) {
      if (!edgesPath.includes(el)) {
        edgesPath.push(el);
      }
    }
    for (const [from, to] of edgesPath) {
      if (!path.includes(from)) {
        path.push(from);
        matrixOfPath[from][to] = 1;
      }
      if (!path.includes(to)) {
        path.push(to);
        matrixOfPath[from][to] = 1;
      }
    }
  }
  counter = 1;
  searchType = 'bfs';
  console.log(matrixOfPath);
  console.log(path);
});
document.getElementById('dfs').addEventListener('click', (event) => {
  path = [];
  edgesPath = [];
  matrixOfPath = new Array(amountOfNodes);
  for (let i = 0; i < amountOfNodes; i++) {
    matrixOfPath[i] = new Array(amountOfNodes).fill(0);
  }
  const adjList = graph.makeAdjList();
  const scc = graph.findSCC();
  for (let i = 0; i < scc.length; i++) {
    for (const el of graph.dfs(scc[i][0])) {
      if (!path.includes(el)) {
        path.push(el);
      }
    }
  }
  for (let i = 1; i < path.length; i++) {
    let from = path[i - 1];
    let to = path[i];
    let temp = i - 1;
    while (!adjList[from].includes(to)) {
      temp--;
      from = path[temp];
    }
    edgesPath.push([from, to]);
    matrixOfPath[from][to] = 1;
  }

  counter = 1;
  searchType = 'dfs';
  console.log(matrixOfPath);
  console.log(path);
});
document.getElementById('next-step').addEventListener('click', (event) => {
  if (counter < amountOfNodes) {
    const [from, to] = edgesPath[counter - 1];
    drawGraph.drawPath(from, to);
    counter++;
  } else {
    counter = 1;
  }
});
