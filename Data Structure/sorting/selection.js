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
    function updateBars(array, currentIndex = null, comparingIndex = null, minIndex = null, sortedIndex = null) {
      chart.innerHTML = '';
      array.forEach((value, index) => {
        if (index === currentIndex) {
          createBar(value, 'comparing');
        } else if (index === comparingIndex) {
          createBar(value, 'swapping');
        } else if (index === minIndex) {
          createBar(value, 'minimum');
        } else if (index < sortedIndex) {
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
  
    // Selection sort algorithm
    async function selectionSort(array) {
      for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
  
        updateBars(array, null, null, minIndex, i);
        await new Promise(resolve => setTimeout(resolve, speed));
  
        for (let j = i + 1; j < array.length; j++) {
          updateBars(array, j, null, minIndex, i);
          await new Promise(resolve => setTimeout(resolve, speed));
          if (array[j] < array[minIndex]) {
            minIndex = j;
            updateBars(array, j, null, minIndex, i);
            await new Promise(resolve => setTimeout(resolve, speed));
          }
        }
        if (minIndex !== i) {
          swap(array, i, minIndex);
          updateBars(array, i, minIndex, null, i);
          await new Promise(resolve => setTimeout(resolve, speed));
        }
        updateBars(array, null, null, null, i + 1);
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      updateBars(array, null, null, null, array.length);
    }
  
    // Initialize and start the selection sort visualization
    async function startSelectionSort(array) {
      chart.innerHTML = '';
      array.forEach(value => createBar(value, 'unsorted'));
      await selectionSort(array);
      updateBars(array, null, null, null, array.length);
    }
  
    startSelectionSort(arrayValues);
  });
  