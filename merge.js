document.getElementById('start').addEventListener('click', () => {
    const totalValue = document.getElementById("size").value;
    const speed = document.getElementById("speed").value * 100;
  
    const randomIntArrayInRange = (min, max, n = 1) =>
      Array.from(
        { length: n },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
  
    let arrayValues = randomIntArrayInRange(1, 35, totalValue);
    let chart = document.getElementById("chart");
  
    // Create a bar for each array value
    function createBar(value, status) {
      let div = document.createElement("DIV");
      div.style.height = value * 10 + "px";
      div.style.width = "2px";
      div.style.margin = "10px";
      div.id = "bar" + value;
      div.classList.add("bar");
      div.classList.add(status);
      div.innerHTML = "<span>" + value + "</span>";
      chart.appendChild(div);
    }
  
    // Update the bars' appearance based on their current state
    function updateBars(array, leftIndex = null, rightIndex = null, sortedIndex = null, mergeIndices = null) {
      chart.innerHTML = '';
      array.forEach((value, index) => {
        if (mergeIndices && mergeIndices.includes(index)) {
          createBar(value, 'merging');
        } else if (index === leftIndex || index === rightIndex) {
          createBar(value, 'comparing');
        } else if (index >= sortedIndex) {
          createBar(value, 'sorted');
        } else {
          createBar(value, 'unsorted');
        }
      });
    }
  
    // Merge function used in merge sort
    async function merge(arr, left, mid, right) {
      let n1 = mid - left + 1;
      let n2 = right - mid;
  
      let L = new Array(n1);
      let R = new Array(n2);
  
      for (let i = 0; i < n1; i++)
        L[i] = arr[left + i];
      for (let j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
  
      let i = 0, j = 0, k = left;
  
      while (i < n1 && j < n2) {
        updateBars(arr, left + i, mid + 1 + j, null, [k]);
        await new Promise(resolve => setTimeout(resolve, speed));
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        k++;
      }
  
      while (i < n1) {
        arr[k] = L[i];
        updateBars(arr, left + i, null, null, [k]);
        await new Promise(resolve => setTimeout(resolve, speed));
        i++;
        k++;
      }
  
      while (j < n2) {
        arr[k] = R[j];
        updateBars(arr, null, mid + 1 + j, null, [k]);
        await new Promise(resolve => setTimeout(resolve, speed));
        j++;
        k++;
      }
    }
  
    // Merge sort function
    async function mergeSort(arr, left, right) {
      if (left >= right) {
        return;
      }
      let mid = left + Math.floor((right - left) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
      updateBars(arr, null, null, right + 1);
    }
  
    // Initialize and start the merge sort visualization
    async function startMergeSort(array) {
      chart.innerHTML = '';
      array.forEach(value => createBar(value, 'unsorted'));
      await mergeSort(array, 0, array.length - 1);
      updateBars(array, null, null, array.length);
    }
  
    startMergeSort(arrayValues);
  });
  