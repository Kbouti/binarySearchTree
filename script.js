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

    let fullArray = array;
    let temp;

// Ok this is getting better but the issue is that temp is an array with a single element, we just want it to be a number


    let finalArray = [];
    while (fullArray.length > 0){
        temp = fullArray.splice(0,1);
        console.log(`temp: ${temp}`);
        console.log(`fullArray: ${fullArray}`);
        for (let i = 0;i < fullArray.length; i++){
            console.log(fullArray[i]);
            if (temp == fullArray[i]){
                console.log(`We got a match! Gotta remove this: ${temp}`);
                console.log(`fullArray pre slice: ${fullArray}`);
                fullArray.splice(i, 1);
                console.log(`fullArray post slice: ${fullArray}`);
                // I think this might have worked to remove the duplicate element
            }
            
        }
        finalArray.push(temp);

    }
console.log(finalArray)
return array
}

let testArray1 = [6, 2];
let testArray2 = [6, 3, 6];
let testArray3 = [6, 3, 9, 2];
let testArray4 = [6, 3, 9, 2, 3, 9, 9];
let testArray5 = [1, 2, 3, 4, 5, 6, 1, 7];


// console.log(buildTree(testArray1));
// console.log(buildTree(testArray2));
console.log(buildTree(testArray5));

