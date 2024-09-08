'use strict';
export default class DrawGraph {
  constructor(canvas, adjacencyMatrix, weightMatrix) {
    this.canvas = canvas;
    this.adjacencyMatrix = adjacencyMatrix;
    this.weightMatrix = weightMatrix;
    this.nodes = [];
    this.context = this.canvas.getContext('2d');
  }
  drawNode(nodeRadius, x, y, color = 'black', text = '') {
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = '20px Arial';
    this.context.lineWidth = 5;

    this.context.fillText(text, x, y, nodeRadius);
    this.context.arc(x, y, nodeRadius, 0, Math.PI * 2, false);
    this.context.stroke();
    this.context.strokeStyle = 'black';
    this.context.closePath();
  }

  drawEdge(nodeRadius, fromX, fromY, toX, toY, i, j, color = '#263e7c') {
    const dx = toX - fromX;
    const dy = toY - fromY;
    let angle = Math.atan2(dy, dx);
    fromX = fromX + nodeRadius * Math.cos(angle);
    fromY = fromY + nodeRadius * Math.sin(angle);
    toX = toX - nodeRadius * Math.cos(angle);
    toY = toY - nodeRadius * Math.sin(angle);
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.moveTo(fromX, fromY);
    this.context.lineTo(toX, toY);
    this.context.stroke();
    this.context.strokeStyle = 'black';
    this.context.closePath();
  }
  drawWeights(fromX, fromY, toX, toY, i, j, color = '') {
    this.context.fillStyle = '#ff7b08';
    this.context.font = 'bold 20px Arial';
    this.context.fillText(this.weightMatrix[i][j], (toX + fromX) / 2, (toY + fromY) / 2);
    this.context.fillStyle = 'black';
  }
  drawEdgeToItself(nodeRadius, x, y, i) {
    const dx = this.canvas.width / 2 - x;
    const dy = this.canvas.height / 2 - y;
    const angle = Math.atan2(dy, dx);
    const radiusToItself = (nodeRadius * 2) / 3;
    const offsetX = x - (nodeRadius + radiusToItself) * Math.cos(angle);
    const offsetY = y - (nodeRadius + radiusToItself) * Math.sin(angle);
    this.context.beginPath();
    this.context.strokeStyle = '#263e7c';
    this.context.arc(offsetX, offsetY, radiusToItself, 0, Math.PI * 2, false);
    this.drawWeights(offsetX, offsetY, offsetX, offsetY, i, i);
    this.context.stroke();
    this.context.strokeStyle = 'black';
    this.context.closePath();
  }

  drawInCircle(amount, distanceFromCenter, nodeRadius) {
    let angle = 0;
    for (let i = 0; i < amount; i++) {
      const x = this.canvas.width / 2 + distanceFromCenter * Math.cos(angle);
      const y = this.canvas.height / 2 + distanceFromCenter * Math.sin(angle);
      const node = { x, y, text: i };
      this.nodes.push(node);
      this.drawNode(nodeRadius, x, y, 'black', i);
      angle += (2 * Math.PI) / amount;
    }
    this.context.stroke();
  }
  drawGraphInCircle(distanceFromCenter, nodeRadius) {
    const matrix = this.adjacencyMatrix;
    this.drawInCircle(matrix.length, distanceFromCenter, nodeRadius);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) {
          if (i === j) {
            this.drawEdgeToItself(nodeRadius, this.nodes[i].x, this.nodes[i].y, i);
          } else {
            this.drawEdge(nodeRadius, this.nodes[i].x, this.nodes[i].y, this.nodes[j].x, this.nodes[j].y, i, j);
          }
        }
      }
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1 && i !== j) {
          this.drawWeights(this.nodes[i].x, this.nodes[i].y, this.nodes[j].x, this.nodes[j].y, i, j);
        }
      }
    }
  }
  drawPath(nodeRadius, from, to) {
    this.drawNode(nodeRadius, this.nodes[from].x, this.nodes[from].y, '#b80202');
    this.drawEdge(nodeRadius, this.nodes[from].x, this.nodes[from].y, this.nodes[to].x, this.nodes[to].y, from, to, '#b80202');
    this.drawWeights(this.nodes[from].x, this.nodes[from].y, this.nodes[to].x, this.nodes[to].y, from, to);
    this.drawNode(nodeRadius, this.nodes[to].x, this.nodes[to].y, '#b80202');
  }
}
