// Build a binary search tree
// The buildTree function should take an array of numbers and turn it into a balanced binary tree full of Node objects appropriately placed.
// This function should return the level-0 root node

class Node {
  constructor(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root;
  }
}

function buildTree(array) {
  // The first step is to remove any duplicate elements, still working on that. I can remove a single duplicate in a set but not 3+
  let temp;
  let finalArray = [];
  while (array.length > 0) {
    temp = Number(array.splice(0, 1));
    for (let i = 0; i < array.length; i++) {
      if (temp === array[i]) {
        array.splice(i, 1);
      }
    }
    finalArray.push(temp);
  }
  array = finalArray;
  return array;
}

function removeDuplicates(array) {
  let firstElement = array[0];
  let newArray = [];
  let nextElement;
  let j = 0;
  newArray.push(firstElement);
  while (array.length > 0) {
    nextElement = array[j];
    for (let i = 0; i < newArray.length; i++) {
      if (nextElement == newArray[i]) {
        j++;
      }
    }
  }
}

let testArray1 = [6, 2];
let testArray2 = [6, 3, 6];
let testArray3 = [6, 3, 9, 2];
let testArray4 = [6, 3, 9, 2, 3, 9, 9];
let testArray5 = [
  1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6,
];

// console.log(buildTree(testArray1));
// console.log(buildTree(testArray2));
console.log(buildTree(testArray5));
console.log(buildTree(testArray2));
