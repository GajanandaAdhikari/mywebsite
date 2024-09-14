// Get references to HTML elements
const numTreesSlider = document.getElementById('numTrees');
const treeDepthSlider = document.getElementById('treeDepth');
const numTreesValue = document.getElementById('numTreesValue');
const treeDepthValue = document.getElementById('treeDepthValue');
const visualizeBtn = document.getElementById('visualizeBtn');

// Update displayed values of sliders
numTreesValue.textContent = numTreesSlider.value;
treeDepthValue.textContent = treeDepthSlider.value;

// Function to generate random data points
function generateRandomData(numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        // Create random points with two features
        const x = Math.random() * 800;
        const y = Math.random() * 600;
        data.push({ x, y });
    }
    return data;
}

// Function to draw a simple decision tree
function drawDecisionTree(ctx, x, y, depth) {
    if (depth === 0) return;

    // Draw the tree node
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 20, 20);

    // Draw branches
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 20);
    ctx.lineTo(x - 30, y + 60); // Left branch
    ctx.moveTo(x + 10, y + 20);
    ctx.lineTo(x + 50, y + 60); // Right branch
    ctx.stroke();

    // Recursive calls for child nodes
    drawDecisionTree(ctx, x - 30, y + 60, depth - 1);
    drawDecisionTree(ctx, x + 50, y + 60, depth - 1);
}

// Function to draw the Random Forest visualization
function drawForest(numTrees, maxDepth) {
    const canvas = document.getElementById('forestCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = generateRandomData(100); // Generate 100 random data points

    // Draw data points
    ctx.fillStyle = 'blue';
    data.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw trees
    for (let i = 0; i < numTrees; i++) {
        drawDecisionTree(ctx, 100 + i * 100, 50, maxDepth);
    }
}

// Event listeners for sliders
numTreesSlider.addEventListener('input', () => {
    numTreesValue.textContent = numTreesSlider.value;
});

treeDepthSlider.addEventListener('input', () => {
    treeDepthValue.textContent = treeDepthSlider.value;
});

// Event listener for the visualize button
visualizeBtn.addEventListener('click', () => {
    const numTrees = parseInt(numTreesSlider.value);
    const treeDepth = parseInt(treeDepthSlider.value);
    drawForest(numTrees, treeDepth);
});

// Initial visualization
drawForest(parseInt(numTreesSlider.value), parseInt(treeDepthSlider.value));
