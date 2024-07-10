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
    function updateBars(array, currentIndex = null, comparingIndex = null, sortedIndex = null) {
      chart.innerHTML = '';
      array.forEach((value, index) => {
        if (index === currentIndex) {
          createBar(value, 'comparing');
        } else if (index === comparingIndex) {
          createBar(value, 'swapping');
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
  
    // Insertion sort algorithm
    async function insertionSort(array) {
      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
  
        updateBars(array, i, null, i - 1);
        await new Promise(resolve => setTimeout(resolve, speed));
  
        while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          updateBars(array, j, j + 1, i - 1);
          await new Promise(resolve => setTimeout(resolve, speed));
          j = j - 1;
        }
        array[j + 1] = key;
        updateBars(array, null, null, i);
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      updateBars(array, null, null, array.length - 1);
    }
  
    // Initialize and start the insertion sort visualization
    async function startInsertionSort(array) {
      chart.innerHTML = '';
      array.forEach(value => createBar(value, 'unsorted'));
      await insertionSort(array);
      updateBars(array, null, null, array.length);
    }
  
    startInsertionSort(arrayValues);
  });
  