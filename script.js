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
    
  let newArray = [];
  let currentElement;
  for (let i = 0; i <= array.length; i++) {
    currentElement = array[0];
    console.log(`currentElement: ${currentElement}`);
    if (newArray.length == 0){
        console.log(`new array length is zero, so pushing ${currentElement}`);
        newArray.push(currentElement);
    } else if (newArray.length !== 0){
        console.log(`newArray contains an element, compare ${currentElement} and determine if it needs to be added.`)
    }
  }
  return newArray;
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
// console.log(buildTree(testArray5));
// console.log(buildTree(testArray2));

// console.log(removeDuplicates(testArray5));
console.log(removeDuplicates(testArray2));
