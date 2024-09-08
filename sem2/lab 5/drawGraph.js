'use strict';
export default class DrawGraph {
  constructor(canvas, graph, nodeRadius) {
    this.canvas = canvas;
    this.graph = graph;
    this.nodeRadius = nodeRadius;
    this.nodes = [];
    this.context = this.canvas.getContext('2d');
  }
  drawNode(x, y, color = 'black', text = '') {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '20px Arial';
    this.context.lineWidth = 5;

    this.context.fillText(text, x, y);
    this.context.arc(x, y, this.nodeRadius, 0, Math.PI * 2, false);
    this.context.stroke();
    this.context.strokeStyle = 'black';
    this.context.closePath();
  }

  #drawArrow(x, y, angle, headLength, color = '#263e7c') {
    this.context.strokeStyle = color;
    this.context.lineTo(x - headLength * Math.cos(angle - Math.PI / 6), y - headLength * Math.sin(angle - Math.PI / 6));
    this.context.moveTo(x, y);
    this.context.lineTo(x - headLength * Math.cos(angle + Math.PI / 6), y - headLength * Math.sin(angle + Math.PI / 6));
  }
  drawEdge(fromX, fromY, toX, toY, i, j, color = '#263e7c') {
    const headLength = 15; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    let angle = Math.atan2(dy, dx);
    fromX = fromX + this.nodeRadius * Math.cos(angle);
    fromY = fromY + this.nodeRadius * Math.sin(angle);
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.moveTo(fromX, fromY);
    if (this.graph.isDirected && this.graph.adjacencyMatrix[i][j] === this.graph.adjacencyMatrix[j][i]) {
      const offset = Math.PI / 8;
      toX = toX - this.nodeRadius * Math.cos(angle + offset);
      toY = toY - this.nodeRadius * Math.sin(angle + offset);
    } else {
      toX = toX - this.nodeRadius * Math.cos(angle);
      toY = toY - this.nodeRadius * Math.sin(angle);
    }
    this.context.lineTo(toX, toY);
    if (this.graph.isDirected) this.#drawArrow(toX, toY, angle, headLength, color);
    this.context.stroke();
    this.context.strokeStyle = 'black';
    this.context.closePath();
  }
  #drawEdgeToItself(x, y) {
    const headLength = 15; // length of head in pixels
    const dx = this.canvas.width / 2 - x;
    const dy = this.canvas.height / 2 - y;
    const angle = Math.atan2(dy, dx);
    const radiusToItself = (this.nodeRadius * 2) / 3;
    const radiusToItselfX = radiusToItself * Math.cos(angle);
    const radiusToItselfY = radiusToItself * Math.sin(angle);
    const offsetX = this.nodeRadius * Math.cos(angle);
    const offsetY = this.nodeRadius * Math.sin(angle);
    this.context.beginPath();
    this.context.strokeStyle = '#263e7c';
    this.context.arc(x - offsetX - radiusToItselfX, y - offsetY - radiusToItselfY, radiusToItself, 0, Math.PI * 2, false);
    this.context.moveTo(x - offsetX, y - offsetY);
    if (this.graph.isDirected) this.#drawArrow(x - offsetX, y - offsetY, angle - Math.PI / 2, headLength);
    this.context.stroke();
    this.context.strokeStyle = 'Black';
    this.context.closePath();
  }

  #drawInCircle(amount, distanceFromCenter) {
    let angle = 0;
    for (let i = 0; i < amount; i++) {
      const x = this.canvas.width / 2 + distanceFromCenter * Math.cos(angle);
      const y = this.canvas.height / 2 + distanceFromCenter * Math.sin(angle);
      const node = { x, y, text: i };
      this.nodes.push(node);
      this.drawNode(x, y, 'black', i);
      angle += (2 * Math.PI) / amount;
    }
    this.context.stroke();
  }
  drawGraphInCircle(distanceFromCenter) {
    this.#drawInCircle(this.graph.numberNodes, distanceFromCenter);
    this.#drawInCircle(this.graph.numberNodes, distanceFromCenter);
    const matrix = this.graph.adjacencyMatrix;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) {
          if (i === j) {
            this.#drawEdgeToItself(this.nodes[i].x, this.nodes[i].y);
          } else {
            this.drawEdge(this.nodes[i].x, this.nodes[i].y, this.nodes[j].x, this.nodes[j].y, i, j);
          }
        }
      }
    }
  }
  drawPath(from, to) {
    this.drawNode(this.nodes[from].x, this.nodes[from].y, 'red');
    this.drawEdge(this.nodes[from].x, this.nodes[from].y, this.nodes[to].x, this.nodes[to].y, from, to, 'red');
    this.drawNode(this.nodes[to].x, this.nodes[to].y, 'red');
  }
}
