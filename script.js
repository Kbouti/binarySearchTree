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

function compareNumbers(a, b) {
  return a - b;
}

function formatArray(array) {
  const tempArray = Array.from(array);
  let newArray = [];
  let currentElement;
  for (let i = 0; i < tempArray.length; i++) {
    currentElement = tempArray[i];
    if (newArray.length == 0) {
      newArray.push(currentElement);
      array = array.splice(1);
    } else if (newArray.length !== 0) {
      let match = false;
      for (let j = 0; j < newArray.length; j++) {
        if (currentElement == newArray[j]) {
          match = true;
        }
      }
      if (match == false) {
        newArray.push(currentElement);
        array = array.splice(1);
      }
    }
  }
  newArray.sort(compareNumbers);
  return newArray;
}

function buildTree(array) {
  let formattedArray = formatArray(array);
  let middleNodeIndex = Math.floor(formattedArray.length / 2);
  console.log(`middleNodeIndex: ${middleNodeIndex}`);
  let middleNode = formattedArray[middleNodeIndex];
  console.log(`middleNode: ${middleNode}`);

  // So we've sorted the array and removed duplicates and found the center node. This will be the root node the function returns
  // Next we need to recursively call the function on the left side of the Array and the right side
  // The root node of the main function will will point to the root node of the left and the right sides

  return formattedArray;
}

let testArray1 = [6, 2, 22, 12, 54, 22];
let testArray2 = [12, 3, 54, 109, 54, 3, 423];

console.log(buildTree(testArray2));
