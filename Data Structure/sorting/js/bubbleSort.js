function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Example to visualize bubble sort
let arr = [5, 1, 4, 2, 8];
console.log("Before Sorting: " + arr);
arr = bubbleSort(arr);
console.log("After Sorting: " + arr);
