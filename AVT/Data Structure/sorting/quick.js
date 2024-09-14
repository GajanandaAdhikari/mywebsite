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
    function updateBars(array, leftIndex = null, rightIndex = null, pivotIndex = null, sortedIndex = null, swapIndex1 = null, swapIndex2 = null) {
      chart.innerHTML = '';
      array.forEach((value, index) => {
        if (index === pivotIndex) {
          createBar(value, 'pivot');
        } else if (index === swapIndex1 || index === swapIndex2) {
          createBar(value, 'swapping');
        } else if (index === leftIndex || index === rightIndex) {
          createBar(value, 'comparing');
        } else if (index <= sortedIndex) {
          createBar(value, 'sorted');
        } else {
          createBar(value, 'unsorted');
        }
      });
    }
  
    // Log the swap transactions
    function logTransaction(index1, value1, index2, value2) {
      console.log(`Swapping index ${index1} (value: ${value1}) with index ${index2} (value: ${value2})`);
    }
  
    // Swap two elements in the array
    function swap(array, index1, index2) {
      logTransaction(index1, array[index1], index2, array[index2]);
      let temp = array[index1];
      array[index1] = array[index2];
      array[index2] = temp;
    }
  
    // Partition function used in quick sort
    async function partition(array, low, high) {
      let pivot = array[high];
      let i = (low - 1);
  
      updateBars(array, null, null, high);
      await new Promise(resolve => setTimeout(resolve, speed));
  
      for (let j = low; j < high; j++) {
        updateBars(array, j, null, high);
        await new Promise(resolve => setTimeout(resolve, speed));
        if (array[j] < pivot) {
          i++;
          swap(array, i, j);
          updateBars(array, i, j, high, null, i, j);
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
      swap(array, i + 1, high);
      updateBars(array, i + 1, high, high, null, i + 1, high);
      await new Promise(resolve => setTimeout(resolve, speed));
      return (i + 1);
    }
  
    // Quick sort function
    async function quickSort(array, low, high) {
      if (low < high) {
        let pi = await partition(array, low, high);
        updateBars(array, null, null, pi);
        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
      } else if (low >= 0 && high >= 0 && low < array.length && high < array.length) {
        updateBars(array, null, null, high);
      }
    }
  
    // Initialize and start the quick sort visualization
    async function startQuickSort(array) {
      chart.innerHTML = '';
      array.forEach(value => createBar(value, 'unsorted'));
      await quickSort(array, 0, array.length - 1);
      updateBars(array, null, null, array.length);
    }
  
    startQuickSort(arrayValues);
  });
  