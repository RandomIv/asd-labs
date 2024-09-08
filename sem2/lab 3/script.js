import Graph from './graph.js';
const n1 = 3;
const n2 = 2;
const n3 = 1;
const n4 = 0;
const k = 1.0 - n3 * 0.02 - n4 * 0.005 - 0.25;
const generator = new Math.seedrandom([n1, n2, n3, n4].join);

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

canvas.height = windowHeight;
canvas.width = windowWidth;

const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const nodeRadius = 30;
const distanceFromCenter = 300;
const nodes = [];
let directed;

const graph = new Graph(10 + n3);

const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
const drawNode = (x, y, nodeRadius, text) => {
  context.beginPath();
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = '20px Arial';
  context.lineWidth = 5;

  context.fillText(text, x, y);
  context.arc(x, y, nodeRadius, 0, Math.PI * 2, false);
  context.stroke();

  context.closePath();

};

const drawArrow = (x, y, angle, headlen) => {
  context.strokeStyle = '#263e7c';
  context.lineTo(x - headlen * Math.cos(angle - Math.PI / 6), y - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(x, y);
  context.lineTo(x - headlen * Math.cos(angle + Math.PI / 6), y - headlen * Math.sin(angle + Math.PI / 6));
};
const drawEdge = (fromX, fromY, toX, toY, i, j) => {
  const headlen = 15; // length of head in pixels
  const dx = toX - fromX;
  const dy = toY - fromY;
  let angle = Math.atan2(dy, dx);
  fromX = fromX + nodeRadius * Math.cos(angle);
  fromY = fromY + nodeRadius * Math.sin(angle);
  context.beginPath();
  context.strokeStyle = '#263e7c';
  context.moveTo(fromX, fromY);
  if (graph.isDirected && graph.adjacencyMatrix[i][j] === graph.adjacencyMatrix[j][i]) {
    const offset = Math.PI / 8;
    toX = toX - nodeRadius * Math.cos(angle + offset);
    toY = toY - nodeRadius * Math.sin(angle + offset);
  } else {
    toX = toX - nodeRadius * Math.cos(angle);
    toY = toY - nodeRadius * Math.sin(angle);
  }
  context.lineTo(toX, toY);
  if (graph.isDirected) drawArrow(toX, toY, angle, headlen);
  context.stroke();
  context.strokeStyle = 'Black';
  context.closePath();
};
const drawEdgeToItself = (x, y) => {
  const headlen = 15; // length of head in pixels
  const dx = middleX - x;
  const dy = middleY - y;
  const angle = Math.atan2(dy, dx);
  const radiusToItself = (nodeRadius * 2) / 3;
  const radiusToItselfX = radiusToItself * Math.cos(angle);
  const radiusToItselfY = radiusToItself * Math.sin(angle);
  const offsetX = nodeRadius * Math.cos(angle);
  const offsetY = nodeRadius * Math.sin(angle);
  context.beginPath();
  context.strokeStyle = '#263e7c';
  context.arc(x - offsetX - radiusToItselfX, y - offsetY - radiusToItselfY, radiusToItself, 0, Math.PI * 2, false);
  context.moveTo(x - offsetX, y - offsetY);
  if (graph.isDirected) drawArrow(x - offsetX, y - offsetY, angle - Math.PI / 2, headlen);
  context.stroke();
  context.strokeStyle = 'Black';
  context.closePath();
};

const drawInCircle = (amount, distance) => {
  let angle = 0;
  for (let i = 1; i <= amount; i++) {
    const x = middleX + distance * Math.cos(angle);
    const y = middleY + distance * Math.sin(angle);
    const node = { x, y, nodeRadius, text: i };
    nodes.push(node);
    drawNode(x, y, nodeRadius, i);
    angle += (2 * Math.PI) / amount;
  }
  context.stroke();
};
const drawGraph = (graph) => {
  drawInCircle(10 + n3, distanceFromCenter);
  const matrix = graph.adjacencyMatrix;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 1) {
        if (i === j) {
          drawEdgeToItself(nodes[i].x, nodes[i].y);
        } else {
          drawEdge(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, i, j);
        }
      }
    }
  }
};
document.addEventListener('keypress', (event) => {
  //press Enter co change
  if (event.code === 'Enter') {
    if (graph.isDirected) {
      directed = graph.toUndirected();
    } else {
      graph.adjacencyMatrix = directed;
    }
    graph.isDirected = !graph.isDirected;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGraph(graph);
    console.log(graph.adjacencyMatrix);
  }
});

graph.randm(generator);
graph.mulmr(k);
drawGraph(graph);
console.log(graph.adjacencyMatrix);
