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
  function updateBars(array, compareIndex1 = null, compareIndex2 = null, sortedIndex = null, swapIndex1 = null, swapIndex2 = null) {
    chart.innerHTML = '';
    array.forEach((value, index) => {
      if (index === swapIndex1 || index === swapIndex2) {
        createBar(value, 'swapping');
      } else if (index === compareIndex1 || index === compareIndex2) {
        createBar(value, 'comparing');
      } else if (index >= sortedIndex) {
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

  // Bubble sort algorithm
  function bubbleSort(array) {
    let i = 0;
    let j = 0;

    function sortStep() {
      if (i < array.length - 1) {
        if (j < array.length - 1 - i) {
          updateBars(array, j, j + 1, array.length - i);
          if (array[j] > array[j + 1]) {
            setTimeout(() => {
              updateBars(array, j, j + 1, array.length - i, j, j + 1);
              setTimeout(() => {
                swap(array, j, j + 1);
                updateBars(array, j, j + 1, array.length - i);
                j++;
                setTimeout(sortStep, speed);
              }, speed);
            }, speed);
          } else {
            j++;
            setTimeout(sortStep, speed);
          }
        } else {
          j = 0;
          i++;
          updateBars(array, null, null, array.length - i);
          setTimeout(sortStep, speed);
        }
      } else {
        console.log(array);
        updateBars(array, null, null, array.length);
      }
    }

    sortStep();
  }

  updateBars(arrayValues, null, null, 0);
  bubbleSort(arrayValues);
});
