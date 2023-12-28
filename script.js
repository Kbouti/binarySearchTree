// Build a binary search tree

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
  // This function should take an array of numbers and turn it into a balanced binary tree full of Node objects appropriately placed.
  // The first step is to sort the array and remove any duplicates.
  // This function should return the level-0 root node

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

let testArray1 = [6, 2];
let testArray2 = [6, 3, 6];
let testArray3 = [6, 3, 9, 2];
let testArray4 = [6, 3, 9, 2, 3, 9, 9];
let testArray5 = [10, 2, 3, 4, 5, 5, 6, 1, 7, 1, 1, 1, 1];


// console.log(buildTree(testArray1));
// console.log(buildTree(testArray2));
console.log(buildTree(testArray5));
console.log(buildTree(testArray2));

// We still haven't solved the issue of finding and fixing an element that occurs more than twice
