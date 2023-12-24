// Build a binary search tree

class Node {
    constructor(value){
    this.value = value;
    this.previous = null;
    this.next = null;
    }
}

class Tree {
    constructor(array){
        this.array = array;
        this.root
    }
}

function buildTree(array){
    // This function should take an array of numbers and turn it into a balanced binary tree full of Node objects appropriately placed.
    // The first step is to sort the array and remove any duplicates.
    // This function should return the level-0 root node




    // We might need to start over in pseudocode
    // 1. Take the first element out of the array. Make a new array with all but the first element 
    // 2. Compare each element in this array to the element we removed. If the element is the same, return the test array. 
    // 3. Repeat until you've completed for the last element in the array. 

    for (let i = 0; i < array.length; i++){
        let current = array[i];
        console.log(current)
        for (let j = 0;j < array.length; j++){
            console.log(`current: ${current} array${j}: ${array[j]}`);
            if (i == j){
                console.log(`i = j. Not sure what that means`)
            }
            if ((current == array[j]) && (i !== j)){
                console.log(`found duplicate at index i ${i}`);
                console.log(`The duplicate element is: ${array[i]}`);
                console.log(`array: ${array}`);
                array.splice(i, 1);
                console.log(`array: ${array}`);
                // This works to remove the first duplicate, but if there are 3+ cases of an element it doesn't work
                // I think the problem lies in the comparison in line 28... We need a more robust way to not compare the node to itself
            } else {
                console.log(`Not a duplicate`);
            }
        }
    }
    // When we get to the point where we can add nodes - make sure to catch and do not allow duplicates


return array
}

let testArray1 = [6, 2];
let testArray2 = [6, 3, 6];
let testArray3 = [6, 3, 9, 2];
let testArray4 = [6, 3, 9, 2, 3, 9, 9];
let testArray5 = [1, 1, 2, 2, 2, 1, 1]


// console.log(buildTree(testArray1));
// console.log(buildTree(testArray2));
console.log(buildTree(testArray5));

