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
  let rootNodeValue = formattedArray[middleNodeIndex];
  console.log(`rootNodeValue: ${rootNodeValue}`);
  let rootNode = new Node(rootNodeValue);

  // Now we gotta establish 2 arrays for elements before and after the root node
  console.log(formattedArray);
  let firstHalf = formattedArray.slice(0, middleNodeIndex);
  console.log(firstHalf);
  let lastHalf = formattedArray.slice(middleNodeIndex + 1);
  console.log(lastHalf);

    // rootNode.previous = buildTree(firstHalf);
  //   rootNode.next = buildTree(lastHalf);

  // ^This error'd out, too much recursion. But I think we're on the right track.

  return rootNode;
}

let testArray1 = [6, 2, 22, 12, 54, 22];
let testArray2 = [12, 3, 54, 109, 54, 3, 423];

console.log(buildTree(testArray2));
