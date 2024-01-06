// ******************************************************************************************************************************************************
// Helper Functions:

function compareNumbers(a, b) {
  return a - b;
}

function formatArray(array) {
  let tempArray = Array.from(array);
  let newArray = [];
  let currentElement;
  for (let i = 0; i < array.length; i++) {
    currentElement = array[i];
    if (newArray.length == 0) {
      newArray.push(currentElement);
      tempArray = tempArray.splice(1);
    } else if (newArray.length !== 0) {
      let match = false;
      for (let j = 0; j < newArray.length; j++) {
        if (currentElement == newArray[j]) {
          match = true;
        }
      }
      if (match == false) {
        newArray.push(currentElement);
        tempArray = tempArray.splice(1);
      }
    }
  }
  newArray.sort(compareNumbers);
  return newArray;
}

function buildTree(array) {
  let formattedArray = formatArray(array);
  let rootNode;
  if (formattedArray.length == 0) {
    // console.log(`array length == 0`);
    return null;
  } else if (formattedArray.length === 1) {
    // console.log(`array length == 1`);
    rootNode = new Node(formattedArray[0]);
  } else if (formattedArray.length === 2) {
    // console.log(`array length == 2`);
    rootNode = new Node(formattedArray[0]);
    let nextNode = new Node(formattedArray[1]);
    rootNode.right = nextNode;
    // console.log(rootNode.right);
  } else if (formattedArray.length === 3) {
    // console.log(`array length == 3`);
    // console.log(`rootNode value: ${formattedArray[1]}`);
    rootNode = new Node(formattedArray[1]);
    let previousNode = new Node(formattedArray[0]);
    let nextNode = new Node(formattedArray[2]);
    rootNode.left = previousNode;
    rootNode.right = nextNode;
  } else {
    // console.log(`array length > 3`);
    let middleNodeIndex = Math.floor(formattedArray.length / 2);
    // console.log(`middleNodeIndex: ${middleNodeIndex}`);
    let rootNodeValue = formattedArray[middleNodeIndex];
    // console.log(`rootNodeValue: ${rootNodeValue}`);
    rootNode = new Node(rootNodeValue);
    // console.log(`formattedArray: ${formattedArray}`);
    let firstHalf = formattedArray.slice(0, middleNodeIndex);
    // console.log(`firstHalf: ${firstHalf}`);
    let lastHalf = formattedArray.slice(middleNodeIndex + 1);
    // console.log(`lastHalf: ${lastHalf}`);
    let previousNode = buildTree(firstHalf);
    let nextNode = buildTree(lastHalf);
    rootNode.left = previousNode;
    rootNode.right = nextNode;
  }
  return rootNode;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function logPrettyTree(tree) {
  // Uses prettyPrint function to neatly log the tree
  let node = tree.root;
  prettyPrint(node, (prefix = ""), (isLeft = true));
}

function createRandomArray(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    let newNumber = Math.floor(Math.random() * 100);
    array.push(newNumber);
  }
  console.log(array);
  return array;
}

function createTestTree(length) {
  let array = createRandomArray(length);
  let newTree = new Tree(array);
  logPrettyTree(newTree);
  return newTree;
}

// ******************************************************************************************************************************************************
// Test data

let testArray1 = [6];
let testArray2 = [6, 2];
let testArray3 = [6, 2, 3];
let testArray4 = [6, 2, 22, 12, 54, 22];
let testArray5 = [12, 3, 54, 109, 54, 3, 423];
const testArray7 = [7, 6, 5, 4, 3, 2, 1];
let testArray8 = [20, 30, 32, 34, 36, 40, 50, 60, 85, 80, 75, 70, 65, 70];

// ******************************************************************************************************************************************************
// Classes:

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  isLeafNode() {
    if (this.right == null && this.left == null) {
      return true;
    }
    return false;
  }
  hasTwoNodes() {
    if (this.right !== null && this.left !== null) {
      return true;
    }
    return false;
  }
  hasOnlyRight() {
    if (this.right !== null && this.left == null) {
      return true;
    }
    return false;
  }
  hasOnlyLeft() {
    if (this.left !== null && this.right == null) {
      return true;
    }
    return false;
  }

  insert(value) {
    if (this.value === value) {
      console.log(`This value already exists in the list, we do nothing.`);
      return;
    } else if (this.value > value) {
      if (this.left == null) {
        let newNode = new Node(value);
        this.left = newNode;
        return;
      }
      this.left.insert(value);
      return;
    } else if (this.value < value) {
      if (this.right == null) {
        let newNode = new Node(value);
        this.right = newNode;
        return;
      }
      this.right.insert(value);
      return;
    }
  }
  delete(tree, value, isRootNode, previousNode) {
    console.log(`delete function triggered`);
    console.log(`isRootNode: ${isRootNode}`);

    if (this.value == value) {
      // Code to execute to delete the node
      // Must take into acount whether the node is a leaf node or not
      // How do we reference the previous node?
      // If isRootNode is true there is no node before it

      console.log(`found yer node! Now we gotta delete it`);
      console.log(`isRootNode: ${isRootNode}`);
      console.log(`hasTwoNodes: ${this.hasTwoNodes()}`);
      console.log(`hasOnlyLeft: ${this.hasOnlyLeft()}`);
      console.log(`hasOnlyRight: ${this.hasOnlyRight()}`);
      console.log(`isLeafNode: ${this.isLeafNode()}`);

      if (this.isLeafNode()) {
        console.log(`deleting leaf node`);
        if (previousNode == null) {
          console.log(`node to delete is the one and only node in the list`);
          tree.root = null;
          return;
        } else {
          console.log(`target node is a leaf but not the root`);
          console.log(`previousNode.value: ${previousNode.value}`);
          if (previousNode.value > value) {
            previousNode.left = null;
            return;
          } else {
            previousNode.right = null;
            return;
          }
        }
      } else if (this.hasOnlyLeft()) {
        if (previousNode.value > value) {
          previousNode.left = this.left;
          return;
        } else {
          previousNode.right = this.left;
          return;
        }
      } else if (this.hasOnlyRight()) {

        if (previousNode.value > value) {
            previousNode.left = this.right;
            return;
          } else {
            previousNode.right = this.right;
            return;
          }
  


      } else if (this.hasTwoNodes()) {
      }

      return;
    }

    if (isRootNode) {
      isRootNode = false;
    }

    previousNode = this;

    if (this.value !== value && this.isLeafNode()) {
      console.log(`value ${value} not found`);
      return;
    } else if (this.value !== value && this.hasOnlyRight()) {
      this.right.delete(tree, value, isRootNode, previousNode);
    } else if (this.value !== value && this.hasOnlyLeft()) {
      this.left.delete(tree, value, isRootNode, previousNode);
    } else {
      if (this.value > value) {
        console.log(`this.value > value, checking nodes to the left`);
        this.left.delete(tree, value, isRootNode, previousNode);
        return;
      } else if (this.value < value) {
        console.log(`this.value < value, checking nodes to the right`);
        console.log(this.right);
        this.right.delete(tree, value, isRootNode, previousNode);
        return;
      }
    }
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(array);
  }

  insert(value) {
    let root = this.root;
    if (root == null) {
      this.root = new Node(value);
      return;
    }
    root.insert(value);
    return;
  }

  delete(value) {
    let previousNode = null;
    let tree = this;
    let isRootNode = true;
    this.root.delete(tree, value, isRootNode, previousNode);
    return;
  }
}

// ******************************************************************************************************************************************************
// Tests

let testTree = new Tree(testArray1);
// console.log(testTree);

// createTestTree(16)

// let testTree1 = createTestTree(8);

testTree.insert(1);
testTree.insert(5);
testTree.insert(7);
// testTree.insert(1);
testTree.insert(3);
// testTree.insert(2);
// testTree.delete(6);
// testTree.insert(4);
// testTree.insert(33);
// testTree.delete(4);
// testTree.delete(3);
testTree.delete(5);
testTree.delete(1);
logPrettyTree(testTree);
