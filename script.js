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


for (let i = 0;i < array.length;i++){
    console.log(`i: ${i}`);
    let temp = array.splice(i, 1);
    console.log(`temp: ${temp}`);
    console.log(array);
    console.log(`Need to compare ${temp} to every element in ${array}`);

    // It's skipping even indexes for some reason
    // It's because when we take array[j] we're using the modified array. So it's looking for the next index of the array we just removed an element from. So we're removing an element and incrementing the counter, then taking THAT element. We should only be doing one of those things per step. 
    
    // Ok, about to start over and use a while loop. The problem is that we're cycling through the array with a loop, but we remove an element and increment the index at the same time, so it's skipping elements
    
    for (let j = 0;j< array.length;j++){
        if (temp == (array[j])){
            console.log(`duplicate found`);
            console.log(`array: ${array}`);
            array = array.slice(1, j);
            console.log(`array: ${array}`);
            
        }
        console.log(`Checked if temp = array[j]`);
        console.log(`${temp} !== ${array[j]}`);
    }
}

    // When we get to the point where we can add nodes - make sure to catch and do not allow duplicates


return array
}

let testArray1 = [6, 2];
let testArray2 = [6, 3, 6];
let testArray3 = [6, 3, 9, 2];
let testArray4 = [6, 3, 9, 2, 3, 9, 9];
let testArray5 = [1, 2, 3, 4, 5, 6, 7];


// console.log(buildTree(testArray1));
// console.log(buildTree(testArray2));
console.log(buildTree(testArray5));

