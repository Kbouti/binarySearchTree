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
  console.log(`formattedArray: ${formattedArray}`);
  let firstHalf = formattedArray.slice(0, middleNodeIndex);
  console.log(`firstHalf: ${firstHalf}`);
  let lastHalf = formattedArray.slice(middleNodeIndex + 1);
  console.log(`lastHalf: ${lastHalf}`);

  // I think our base case needs to be length = 3. Then we can call recursively for longer arrays, and assign previous and next for the 3 nodes available
  // If the array length is less than three, then one of the nodes is a ?leaf node? (A node with only one child)
  if (formattedArray.length == 3) {
    console.log(`found 3 length array`);

    let previous = new Node(formattedArray[0]);
    let next = new Node(formattedArray[2]);

    rootNode.previous = previous;
    rootNode.next = next;

    previous.next = rootNode;
    next.previous = rootNode;
    console.log(`next.previous: ${next.previous}`);
    console.log(next.previous);
    console.log(next);
  }

  if (formattedArray.length == 0) {
    console.log(`empty array found`);
    return null;
  } else if ((formattedArray.length = 1)) {
    console.log(`found array length 1`);
    // return new Node(array[0]);
  }
//   let firstSideRoot = buildTree(firstHalf);
//   let lastSideRoot = buildTree(lastHalf);

//   console.log(`firstSideRoot: ${firstSideRoot} `);
//   console.log(`lastSideRoot: ${lastSideRoot}`);

//   rootNode.previous = buildTree(firstHalf);
//   rootNode.next = buildTree(lastHalf);

  return rootNode;
}

let testArray1 = [6, 2, 22, 12, 54, 22];
let testArray2 = [12, 3, 54, 109, 54, 3, 423];
let testArray3 = [6, 2];
let testArray4 = [6, 2, 3];

console.log(buildTree(testArray4));
