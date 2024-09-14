// Function to process and visualize Random Forest
function processData() {
    const rawInput = document.getElementById("dataInput").value;
    const matrix = parseMatrix(rawInput);
    const numTrees = 3;  // Example number of trees for simplicity
  
    const trees = [];
    let finalResults = [];
  
    // Clear previous results
    document.getElementById("baggingResults").innerHTML = "";
    document.getElementById("trees").innerHTML = "";
    document.getElementById("binaryOutput").innerHTML = "";
  
    // Simulate Random Forest (Bagging + Decision Trees)
    for (let i = 0; i < numTrees; i++) {
      const { baggedData, selectedFeatures } = bagging(matrix);
      trees.push(buildDecisionTree(baggedData, selectedFeatures));
  
      displayBaggingResult(i + 1, baggedData, selectedFeatures);
      displayDecisionTree(i + 1, trees[i]);
  
      // Example: Gather binary results from trees (for demo purposes)
      finalResults.push(generateBinaryResult(trees[i]));
    }
  
    displayFinalBinaryOutput(finalResults);
  }
  
  // Parse matrix input from the textarea
  function parseMatrix(input) {
    return input.split('\n').map(row => row.split(',').map(Number));
  }
  
  // Bagging: Randomly selects rows and columns
  function bagging(matrix) {
    const selectedRows = [];
    const selectedCols = [];
    const baggedData = [];
  
    // Select random rows
    for (let i = 0; i < matrix.length; i++) {
      const randomRow = matrix[Math.floor(Math.random() * matrix.length)];
      selectedRows.push(randomRow);
    }
  
    // Select random columns
    for (let i = 0; i < matrix[0].length; i++) {
      selectedCols.push(Math.floor(Math.random() * matrix[0].length));
    }
  
    // Construct bagged data
    selectedRows.forEach(row => {
      const newRow = [];
      selectedCols.forEach(colIndex => newRow.push(row[colIndex]));
      baggedData.push(newRow);
    });
  
    return { baggedData, selectedFeatures: selectedCols };
  }
  
  // Display bagging results
  function displayBaggingResult(treeNum, baggedData, selectedFeatures) {
    const resultDiv = document.getElementById("baggingResults");
    resultDiv.innerHTML += `<p>Tree ${treeNum}: Selected Features: [${selectedFeatures}]</p>`;
  }
  
  // Build a simple decision tree (visual demo)
  function buildDecisionTree(data, features) {
    // Placeholder decision tree logic (for visualization only)
    return `Tree with data: ${JSON.stringify(data)}, features: ${features}`;
  }
  
  // Display decision tree
  function displayDecisionTree(treeNum, tree) {
    const treeDiv = document.getElementById("trees");
    treeDiv.innerHTML += `<div class="decision-tree"><strong>Tree ${treeNum}</strong><pre class="tree-graph">${tree}</pre></div>`;
  }
  
  // Generate a binary result from decision tree (for demo purposes)
  function generateBinaryResult(tree) {
    // Placeholder binary output
    return Math.random() > 0.5 ? 1 : 0;
  }
  
  // Display final binary output
function displayFinalBinaryOutput(finalResults) {
    const binaryOutputDiv = document.getElementById("binaryOutput");
    const majorityVote = finalResults.reduce((a, b) => a + b, 0) > finalResults.length / 2 ? 1 : 0;
    binaryOutputDiv.innerHTML = `<p>Final Binary Output (Majority Vote): ${majorityVote}</p>`;
  }  