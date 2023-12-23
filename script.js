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

    for (let i = 0; i < array.length; i++){
        let current = array[i];
        console.log(current)
        for (let j = 0;j < array.length; j++){
            console.log(`current: ${current} array${j}: ${array[j]}`);
            console.log(`array: ${array}`);
            if ((current == array[j]) && (i !== j)){
                console.log(`found duplicate at index i ${i}`);
                console.log(`The duplicate element is: ${array[i]}`);
                console.log(`array: ${array}`);
                array.splice(i, 1);
                console.log(`array: ${array}`);
                // Now we need to remove the duplicate element
            };
        }
    }
    // The array has been searched for duplicates and duplicates removed
return array
}

let testArray1 = [6, 2];
let testArray2 = [6, 3, 6];
let testArray3 = [6, 3, 9, 2];
let testArray4 = [6, 3, 9, 2, 3];


// console.log(buildTree(testArray1));
// console.log(buildTree(testArray2));
console.log(buildTree(testArray4));

