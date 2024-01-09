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

function addOne(number) {
  return number + 0.69;
}
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

  delete(tree, value, previousNode) {
    console.log(`deleting value: ${value}`);
    if (this.value == value) {
      if (this.isLeafNode()) {
        console.log(`target is a leaf node`);
        if (previousNode == null) {
          tree.root = null;
          return;
        } else {
          if (previousNode.value > value) {
            previousNode.left = null;
            return;
          } else {
            previousNode.right = null;
            return;
          }
        }
      } else if (this.hasOnlyLeft()) {
        console.log(`target has only left children`);
        if (previousNode == null) {
          tree.root = this.left;
          return;
        }
        if (previousNode.value > value) {
          previousNode.left = this.left;
          return;
        } else {
          previousNode.right = this.left;
          return;
        }
      } else if (this.hasOnlyRight()) {
        console.log(`target has only right children`);
        if (previousNode == null) {
          tree.root = this.right;
          return;
        }
        if (previousNode.value > value) {
          previousNode.left = this.right;
          return;
        } else {
          previousNode.right = this.right;
          return;
        }
      } else if (this.hasTwoNodes()) {
        console.log(`target has two children`);
        let nextHighest = this.right;
        let nextHighestParent = this;
        while (nextHighest.left !== null) {
          nextHighestParent = nextHighest;
          nextHighest = nextHighest.left;
        }
        this.value = nextHighest.value;
        nextHighest.delete(tree, nextHighest.value, nextHighestParent);
        return;
      }
      return;
    }
    previousNode = this;
    if (this.value !== value && this.isLeafNode()) {
      console.log(`value ${value} not found`);
      return;
    } else if (this.value !== value && this.hasOnlyRight()) {
      this.right.delete(tree, value, previousNode);
    } else if (this.value !== value && this.hasOnlyLeft()) {
      this.left.delete(tree, value, previousNode);
    } else {
      if (this.value > value) {
        this.left.delete(tree, value, previousNode);
        return;
      } else if (this.value < value) {
        this.right.delete(tree, value, previousNode);
        return;
      }
    }
  }

  find(value) {
    let targetNode = null;
    console.log(`looking for value: ${value}`);
    if (this.value === value) {
      console.log(`found it!`);
      targetNode = this;
    } else if (this.isLeafNode()) {
      console.log(`couldn't find the value you're looking for`);
    } else if (this.value > value) {
      if (this.left == null) {
        console.log(`couldn't find the value you're looking for`);
      }
      targetNode = this.left.find(value);
    } else {
      if (this.right == null) {
        console.log(`couldn't find the value you're looking for`);
      }
      targetNode = this.right.find(value);
    }
    return targetNode;
  }

  inOrder(array) {
    // console.log(`calling inOrder on ${this.value}`);
    if (this.left !== null) {
      this.left.inOrder(array);
    }
    array.push(this.value);
    if (this.right !== null) {
      this.right.inOrder(array);
    }
    return array;
  }

  preOrder(array) {
    // console.log(`calling  preOrder on ${this.value}`);
    array.push(this.value);
    if (this.left !== null) {
      this.left.preOrder(array);
    }
    if (this.right !== null) {
      this.right.preOrder(array);
    }
    return array;
  }

  postOrder(array) {
    // console.log(`calling  postOrder on ${this.value}`);
    if (this.left !== null) {
      this.left.postOrder(array);
    }
    if (this.right !== null) {
      this.right.postOrder(array);
    }
    array.push(this.value);
    return array;
  }

  height() {
    // console.log(`determining the height of ${this.value}`);
    // Returns the height of this node, which is the height of it's tallest child + 1
    let count = 1;
    if (this.isLeafNode()) {
      return count;
    }
    let leftHeight = 0;
    let rightHeight = 0;
    if (this.left !== null) {
      leftHeight = this.left.height();
    }
    if (this.right !== null) {
      rightHeight = this.right.height();
    }
    if (leftHeight > rightHeight) {
      count += leftHeight;
    } else {
      count += rightHeight;
    }
    return count;
  }

  // *****************************************************************************************************
  // *****************************************************************************************************

  depth() {}
}
// *****************************************************************************************************
// *****************************************************************************************************

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
    this.root.delete(tree, value, previousNode);
    return;
  }

  find(value) {
    // Takes a value and returns the node with the given value
    return this.root.find(value);
  }

  levelOrder(callback) {
    // Takes an optional callback function and applies the function to each node in level order
    if (this.root == null) {
      console.log(`function called on empty tree, returning null`);
      return null;
    }
    let queue = [];
    let array = [];
    queue.push(this.root);
    while (queue.length > 0) {
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      array.push(queue[0].value);

      queue.splice(0, 1);
    }
    if (callback == null) {
      return array;
    }
    if (callback() !== null) {
      for (let i = 0; i < array.length; i++) {
        array[i] = callback(array[i]);
      }
      //   console.log(`post-callback array: ${array}`);
    }
    return array;
  }

  inOrder(callback) {
    // Starts at the root node and moves left down the tree until it reaches a node with no left. It then reads it's own value then moves right if there is a node, or back up to it's parent
    if (this.root == null) {
      console.log(`function called on empty tree, returning null`);
      return null;
    }
    let array = [];
    array = this.root.inOrder(array);
    if (callback !== undefined) {
      for (let i = 0; i < array.length; i++) {
        array[i] = callback(array[i]);
      }
    }
    // console.log(array);
    return array;
  }

  preOrder(callback) {
    if (this.root == null) {
      console.log(`called preOrder callback on an empty tree. return null`);
      return null;
    }
    let array = [];
    array = this.root.preOrder(array);
    if (callback !== undefined) {
      for (let i = 0; i < array.length; i++) {
        array[i] = callback(array[i]);
      }
    }
    // console.log(array);
    return array;
  }

  postOrder(callback) {
    if (this.root == null) {
      console.log(`called postOrder callback on an empty tree. return null`);
      return null;
    }
    let array = [];
    array = this.root.postOrder(array);
    if (callback !== undefined) {
      for (let i = 0; i < array.length; i++) {
        array[i] = callback(array[i]);
      }
    }
    // console.log(array);
    return array;
  }

  // *****************************************************************************************************
  // *****************************************************************************************************

  height(node) {
    // Takes a node and returns the height - the number of edges in the longest path from that node to a leaf node
    let count = 0;
    if (this.root == null) {
      //   console.log(`Nothing in this tree, returning 0`);
      return count;
    } else if (node == null) {
      //   console.log(`Node is undefined, returning 0`);
      return count;
    }
    count = node.height();
    // console.log(`final height: ${count}`);
    return count;
  }

  depth(node) {
    // Takes a node and returns the depth - the number of edges in the path from that node to the root node
    let count = 0;
    if (this.root == null) {
      console.log(`Nothing in this tree, returning 0`);
      return count;
    } else if (node == null) {
      console.log(`Node is undefined, returning 0`);
      return count;
    }
    // console.log(`looking for depth of ${node.value}`);

    count++;
    let currentNode = this.root;

    while (currentNode !== node && currentNode !== null) {
      if (currentNode.value > node.value) {
        currentNode = currentNode.left;
        count++;
      } else if (currentNode.value < node.value) {
        currentNode = currentNode.right;
        count++;
      }
    }
    if (currentNode == node) {
      //   console.log(count);
      return count;
    }
  }

  isBalanced() {
    // Returns true if the heights of the left and right subtree of every node differ by no more than 1
    let currentNode = this.root;
    let isBalanced = true;
    let leftTreeHeight;
    let rightTreeHeight;

    if (currentNode.left == undefined) {
      leftTreeHeight = 0;
      //   console.log(`No left nodes, leftTreeHeight is ${leftTreeHeight}`);
    } else {
      leftTreeHeight = this.height(currentNode.left);
      //   console.log(`left node detected, it's height is: ${leftTreeHeight}`);
    }
    if (currentNode.right == undefined) {
      rightTreeHeight = 0;
      //   console.log(`No right nodes, rightTreeHeight is ${rightTreeHeight}`);
    } else {
      rightTreeHeight = this.height(currentNode.right);
      //   console.log(`right node detected, it's height is: ${rightTreeHeight}`);
    }
    // console.log(`final leftTreeHeight: ${leftTreeHeight}`);
    // console.log(`final rightTreeHeight: ${rightTreeHeight}`);

    if (
      leftTreeHeight - rightTreeHeight > 1 ||
      rightTreeHeight - leftTreeHeight > 1
    ) {
      //   console.log(`unbalanced tree`);
      isBalanced = false;
    }
    return isBalanced;
  }

  reBalance() {
    // Returns a reference to this unchanged tree if it is already balanced
    // Otherwise returns as new tree from an inOrder array from the first unbalanced tree
    if (this.isBalanced()) {
      console.log(`Tree is already balanced, returning tree`);
      return this;
    } else {
      console.log(`Creating new balanced tree with array: `);
      let array = this.inOrder();
      console.log(array);

      let newTree = new Tree(array);
      return newTree;
    }
  }
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

// let testTree2 = createTestTree(20);
// ******************************************************************************************************************************************************
// Tests

// let testTree = new Tree(testArray8);
// console.log(testTree);

// let node = testTree.find(85);
// let height = testTree.depth(node);
// console.log(testTree.isBalanced());

// testTree.insert(345);

// testTree.insert(345646);
// testTree.insert(3456465);
// console.log(testTree.isBalanced());

// logPrettyTree(testTree);

// let newTree = testTree.reBalance();
// console.log(newTree.isBalanced());
// prettyPrint(newTree.root);

// *****************************************************************************************************
// *****************************************************************************************************

// Now write a function that does the following:

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
// X    2. Confirm that the tree is balanced by calling isBalanced.
// X    3. Print out all elements in level, pre, post, and in order.
// X    4. Unbalance the tree by adding several numbers > 100.
// X    5. Confirm that the tree is unbalanced by calling isBalanced.
// 6. Balance the tree by calling rebalance.
// 7. Confirm that the tree is balanced by calling isBalanced.
// 8. Print out all elements in level, pre, post, and in order.

function runScript(number) {
  // Takes an optional paramater that will be the length of the original tree

  if (number == null) {
    number = 5;
  }
  let array = createRandomArray(number);
  let tree = new Tree(array);
  prettyPrint(tree.root);
  console.log(`tree.isBalanced?: ${tree.isBalanced()}`);
  console.log(`levelOrder: ${tree.levelOrder()}`);
  console.log(`preOrder: ${tree.preOrder()}`);
  console.log(`inOrder: ${tree.inOrder()}`);
  console.log(`postOrder: ${tree.postOrder()}`);
  for (let i = 0; i < 5; i++) {
    let newNumber = Math.floor(Math.random() * 1000);
    tree.insert(newNumber);
  }
  console.log(`inOrder: ${tree.inOrder()}`);
  console.log(`tree.isBalanced?: ${tree.isBalanced()}`);
  prettyPrint(tree.root);
  tree = tree.reBalance();
  console.log(`tree.isBalanced?: ${tree.isBalanced()}`);
  console.log(`levelOrder: ${tree.levelOrder()}`);
  console.log(`preOrder: ${tree.preOrder()}`);
  console.log(`inOrder: ${tree.inOrder()}`);
  console.log(`postOrder: ${tree.postOrder()}`);
  prettyPrint(tree.root);
}

runScript();
