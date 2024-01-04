// Build a binary search tree
// The buildTree function should take an array of numbers and turn it into a balanced binary tree full of Node objects appropriately placed.
// This function should return the level-0 root node

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(array);
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






const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


function buildTree(array) {
  let formattedArray = formatArray(array);
  let rootNode;
  if (formattedArray.length == 0) {
    console.log(`array length == 0`)
    return null;
  } else if (formattedArray.length === 1) {
    console.log(`array length == 1`)
    rootNode = new Node(formattedArray[0]);
  } else if (formattedArray.length === 2) {
    console.log(`array length == 2`)
    rootNode = new Node(formattedArray[0]);
    let nextNode = new Node(formattedArray[1]);
    rootNode.right = nextNode;
    nextNode.left = rootNode;
console.log(rootNode.right);
  } else if (formattedArray.length === 3) {
    console.log(`array length == 3`)
    rootNode = new Node(formattedArray[1]);
    let previousNode = new Node(formattedArray[0]);
    let nextNode = new Node(formattedArray[2]);
    previousNode.right = rootNode;
    rootNode.left = previousNode;
    rootNode.right = nextNode;
    nextNode.left = rootNode;
  } else {
    console.log(`array length > 3`)
    let middleNodeIndex = Math.floor(formattedArray.length / 2);
    console.log(`middleNodeIndex: ${middleNodeIndex}`);
    let rootNodeValue = formattedArray[middleNodeIndex];
    console.log(`rootNodeValue: ${rootNodeValue}`);
    rootNode = new Node(rootNodeValue);
    console.log(`formattedArray: ${formattedArray}`);
    let firstHalf = formattedArray.slice(0, middleNodeIndex);
    console.log(`firstHalf: ${firstHalf}`);
    let lastHalf = formattedArray.slice(middleNodeIndex + 1);
    console.log(`lastHalf: ${lastHalf}`);
    let previousNode = buildTree(firstHalf);
    let nextNode = buildTree(lastHalf);
    previousNode.right = rootNode;
    rootNode.left = previousNode;
    rootNode.right = nextNode;
    nextNode.left = rootNode;
  }
  return rootNode;
}
let testArray1 = [6];
let testArray2 = [6, 2];
let testArray3 = [6, 2, 3];
let testArray4 = [6, 2, 22, 12, 54, 22];
let testArray5 = [12, 3, 54, 109, 54, 3, 423];



let testNode = buildTree(testArray4);

console.log(testNode);
console.log(testNode.right);
console.log(testNode.left);


// prettyPrint(testNode);




// I'm not understanding the binary search tree properly in my current version of the code. The root node points to a left and right. Each of those point to a left and a right - but neight of them point to the root node. They are pointed to by the root node