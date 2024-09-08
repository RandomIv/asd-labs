'use strict';

export default class Graph {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
  size() {
    let count = 0;
    let node = this;

    while (node) {
      count++;
      node = node.next;
    }

    return count;
  }
  pushEdge(edge) {
    let list = this;
    while (list.next) {
      list = list.next;
    }
    list.next = new Graph(edge);
  }
  deleteEdge() {
    let list = this;
    while (list.next.next) {
      list = list.next;
    }
    list.next = null;
  }
  printList() {
    let list = this;
    while (list) {
      console.log(list.data);
      list = list.next;
    }
  }
  sort() {
    let list = this;
    const arr = [];
    while (list) {
      arr.push(list.data);
      list = list.next;
    }
    arr.sort((a, b) => a[2] - b[2]);
    let newList = this;
    for (const el of arr) {
      newList.data = el;
      newList = newList.next;
    }
  }
  find(node, parents) {
    if (parents[node] === -1) {
      return node;
    }
    return (parents[node] = this.find(parents[node], parents));
  }
  kruskalMST(amountOfNodes) {
    const path = [];
    const parents = new Array(amountOfNodes).fill(-1);
    this.sort();
    let list = this;
    let i = 0;
    let j = 0;
    while (i < amountOfNodes - 1 && j < this.size()) {
      const edge = list.data;
      let from = this.find(edge[0], parents);
      let to = this.find(edge[1], parents);
      if (from === to) {
        j++;
        list = list.next;
        continue;
      }
      parents[from] = to;
      path.push(edge);
      i++;
    }

    return path;
  }
  sumSMT(amountOfNodes) {
    const path = this.kruskalMST(amountOfNodes);
    let sum = 0;
    for (const edge of path) {
      sum += edge[2];
    }
    return sum;
  }
}
